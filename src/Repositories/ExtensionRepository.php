<?php

namespace Flagrow\Bazaar\Repositories;

use Flagrow\Bazaar\Events\ExtensionWasInstalled;
use Flagrow\Bazaar\Events\ExtensionWasUpdated;
use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flagrow\Bazaar\Extensions\PackageManager;
use Flagrow\Bazaar\Jobs\CacheClearJob;
use Flagrow\Bazaar\Search\FlagrowApi as Api;
use Flagrow\Bazaar\Traits\Cachable;
use Flarum\Extension\Event\Uninstalled as ExtensionWasUninstalled;
use Flarum\Extension\ExtensionManager;
use Flarum\Search\SearchResults;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

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
     * @var CacheClearJob
     */
    private $flush;

    /**
     * ExtensionRepository constructor.
     * @param ExtensionManager $manager
     * @param PackageManager $packages
     * @param Api $client
     * @param Dispatcher $events
     * @param CacheClearJob $flush
     */
    function __construct(
        ExtensionManager $manager,
        PackageManager $packages,
        Api $client,
        Dispatcher $events,
        CacheClearJob $flush
    )
    {
        $this->manager = $manager;
        $this->client = $client;
        $this->packages = $packages;
        $this->events = $events;
        $this->flush = $flush;
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

        $collection = Collection::make($data)->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');

        return Collection::make($collection);
    }

    protected function payloadToExtensions(array $data): Collection
    {

        $collection = Collection::make($data)->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');

        return Collection::make($collection);
    }

    /**
     * Filter by search term
     * @param Collection $extensions
     * @param string $search
     * @return Collection
     */
    public function filterSearch(Collection $extensions, $search)
    {
        if (empty($search)) {
            return $extensions;
        }

        return $extensions->filter(function ($extension) use ($search) {
            // Look for the serch term in all these things
            $searchIn = [
                $extension->getPackage(),
                $extension->getTitle(),
                $extension->getDescription(),
            ];

            foreach ($searchIn as $content) {
                if (strpos(strtolower($content), strtolower($search)) !== false) {
                    return true;
                }
            }

            return false;
        });
    }

    /**
     * @param ServerRequestInterface $request
     * @return SearchResults
     * @throws \Exception
     */
    public function index(ServerRequestInterface $request)
    {
        $params = $request->getQueryParams();

        if (!Arr::has($params, 'sort')) {
            Arr::set($params, 'sort', 'name');
        }

        $response = $this->client->get('packages', $params);

        $json = json_decode($response->getBody()->getContents(), true);

        $data = Arr::get($json, 'data', []);
        $hasMore = Arr::get($json, 'meta.pages_total', 1) > Arr::get($json, 'meta.pages_current', 1);

        return new SearchResults($this->payloadToExtensions($data), $hasMore);
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

        $this->flush->fire();

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

        $this->flush->fire();

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

        $this->flush->fire();

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
