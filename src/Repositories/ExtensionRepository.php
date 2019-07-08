<?php

namespace Extiverse\Bazaar\Repositories;

use Extiverse\Bazaar\Events\ExtensionWasInstalled;
use Extiverse\Bazaar\Events\ExtensionWasUpdated;
use Extiverse\Bazaar\Events\SearchedExtensions;
use Extiverse\Bazaar\Events\SearchingExtensions;
use Extiverse\Bazaar\Extensions\Extension;
use Extiverse\Bazaar\Extensions\ExtensionUtils;
use Extiverse\Bazaar\Extensions\PackageManager;
use Extiverse\Bazaar\Search\FlagrowApi as Api;
use Extiverse\Bazaar\Search\SearchResults;
use Extiverse\Bazaar\Traits\Cachable;
use Flarum\Extension\Event\Uninstalled as ExtensionWasUninstalled;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;

final class ExtensionRepository
{
    use Cachable;
    /**
     * @var Extension
     */
    protected $extension;
    /**
     * @var ExtensionManager
     */
    protected $manager;
    /**
     * @var Api
     */
    private $client;
    /**
     * @var PackageManager
     */
    protected $packages;
    /**
     * @var Dispatcher
     */
    protected $events;
    /**
     * @var LoggerInterface
     */
    private $log;

    /**
     * ExtensionRepository constructor.
     *
     * @param ExtensionManager $manager
     * @param PackageManager   $packages
     * @param Api              $client
     * @param Dispatcher       $events
     * @param LoggerInterface  $log
     */
    function __construct(
        ExtensionManager $manager,
        PackageManager $packages,
        Api $client,
        Dispatcher $events,
        LoggerInterface $log
    )
    {
        $this->manager = $manager;
        $this->client = $client;
        $this->packages = $packages;
        $this->events = $events;
        $this->log = $log;
    }

    /**
     * @deprecated
     * @return Collection all extensions from the remote client
     */
    public function allExtensionsFromClient()
    {
        $query = [
            'page[size]' => 9999,
            'page[number]' => 1, // Offset is zero-based, page number is 1-based
            'sort' => 'title' // Sort by package name per default
        ];

        $data = $this->getOrSetCache('flagrow.io.search.list', function () use ($query) {
            $response = $this->client->get('packages', compact('query'));

            $json = json_decode((string)$response->getBody(), true);

            return Arr::get($json, 'data', []);
        });

        return Collection::make($data)->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');
    }

    protected function payloadToExtensions(array $data): Collection
    {
        return Collection::make($data)->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');
    }

    /**
     * @param ServerRequestInterface $request
     * @return SearchResults
     * @throws \Exception
     */
    public function index(ServerRequestInterface $request)
    {
        $params = $orig = $request->getQueryParams();

        $params = collect($params)->filter();

        if ($params->has('q') && ! $params->has('sort')) {
            $params->put('sort', 'name');
        }
        else if (! $params->has('sort')) {
            $params->put('sort', '-downloads');
        }

        $q = $params->get('q');
        $filter = $params->get('filter');

        if (! $filter && ! $q) {
            $params->put('filter', ['is' => ['-flarum']]);
        } elseif (is_string($filter)) {
            parse_str($filter, $filter);
            $params->put('filter', $filter);
        }

        $page = Arr::get($orig, 'page', []);
        $offset = Arr::pull($page, 'offset', 0);
        $page['number'] = floor(($offset+30)/30);
        $params->put('page', $page);

        $this->events->fire(
            new SearchingExtensions($params)
        );
        
        $response = $this->client->get('packages', ['query' => $params->toArray()]);

        if ($response->getStatusCode() >= 400) {
            $this->log->alert("Failed Bazaar call to flagrow.io: {$response->getReasonPhrase()}");
        }

        $json = json_decode($response->getBody()->getContents(), true);

        $data = Arr::get($json, 'data', []);

        $extensions = $this->payloadToExtensions($data);
        $meta = Arr::get($json, 'meta', []);

        $this->events->fire(
            new SearchedExtensions($extensions, $params, $meta)
        );

        return new SearchResults($this->payloadToExtensions($data), $meta);
    }

    /**
     * @param $id
     * @return null|Extension
     */
    public function getExtension($id)
    {
        if (strstr($id, '/')) {
            $id = ExtensionUtils::packageToId($id);
        }

        $response = $this->client->get("packages/$id");

        if ($response->getStatusCode() == 200) {
            $json = json_decode($response->getBody()->getContents(), true);
            return $this->createExtension(Arr::get($json, 'data', []));
        }

        return null;
    }

    /**
     * Create an Extension object and map all data sources.
     *
     * @param array $apiPackage
     * @return Extension
     */
    public function createExtension(array $apiPackage)
    {
        $extension = Extension::createFromAttributes($apiPackage['attributes']);

        $this->refreshInstalledExtension($extension);

        return $extension;
    }

    /**
     * @param Extension $extension
     */
    protected function refreshInstalledExtension(Extension &$extension)
    {
        $extension->setEnabled($this->manager->isEnabled($extension->getShortName()));
        $installedExtension = $this->manager->getExtension($extension->getShortName());

        if (!is_null($installedExtension)) {
            $extension->setInstalledExtension($installedExtension);
        }
    }

    /**
     * Install an extension.
     *
     * @param string $package
     * @return Extension|null
     */
    public function installExtension($package)
    {
        $this->packages->requirePackage($package);

        $extension = $this->getExtension($package);

        if ($extension->getInstalledExtension() !== null) {
            $this->events->fire(
                new ExtensionWasInstalled($extension->getInstalledExtension())
            );
        }

        return $extension;
    }

    /**
     * @param $package
     * @return Extension|null
     */
    public function updateExtension($package)
    {
        $extension = $this->getExtension($package);

        $this->packages->updatePackage($extension->getPackage());

        $this->manager->migrate($extension->getInstalledExtension());

        $this->refreshInstalledExtension($extension);

        $this->events->fire(
            new ExtensionWasUpdated($extension->getInstalledExtension())
        );

        return $extension;
    }

    /**
     * @param $package
     * @return Extension|null
     */
    public function removeExtension($package)
    {
        $extension = $this->getExtension($package);

        if ($extension->isEnabled()) {
            $this->manager->disable($extension->id);
        }

        $this->manager->migrateDown($extension->getInstalledExtension());

        $this->packages->removePackage($extension->getPackage());

        $installedExtension = $extension->getInstalledExtension();

        $extension->setInstalledExtension(null);

        $this->events->fire(
            new ExtensionWasUninstalled($installedExtension)
        );

        return $extension;
    }

    /**
     * @param $package
     * @param bool $favorite
     * @return Extension|null|\Psr\Http\Message\ResponseInterface
     */
    public function favorite($package, $favorite = true)
    {
        $response = $this->client->post('packages/favorite', [
            'form_params' => [
                'package_id' => $package,
                'favorite' => $favorite,
            ],
        ]);

        if (in_array($response->getStatusCode(), [200, 201])) {
            $json = json_decode($response->getBody()->getContents(), true);
            return $this->createExtension(Arr::get($json, 'data', []));
        }

        if ($response->getStatusCode() === 409) {
            return $response;
        }

        return null;
    }

    /**
     * @param string $package
     * @param bool $buy
     * @return Extension|null
     */
    public function buy($package, $buy = true)
    {
        $response = $this->client->request($buy ? 'post' : 'delete', 'packages/' . $package . '/buy');

        if (in_array($response->getStatusCode(), [200, 201])) {
            $json = json_decode($response->getBody()->getContents(), true);
            return $this->createExtension(Arr::get($json, 'data', []));
        }

        return null;
    }
}
