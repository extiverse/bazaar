<?php

namespace Flagrow\Bazaar\Repositories;

use Flagrow\Bazaar\Events\ExtensionWasInstalled;
use Flagrow\Bazaar\Events\ExtensionWasUpdated;
use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flagrow\Bazaar\Extensions\PackageManager;
use Flagrow\Bazaar\Jobs\CacheClearJob;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Core\Search\SearchResults;
use Flarum\Event\ExtensionWasUninstalled;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ExtensionRepository
{
    /**
     * @var FlagrowApi
     */
    private $flagrowApi;
    /**
     * @var Dispatcher
     */
    protected $events;
    /**
     * @var CacheClearJob
     */
    protected $cacheClearJob;
    /**
     * @var PackageManager
     */
    protected $packageManager;
    /**
     * @var ExtensionManager
     */
    protected $extensionManager;
    /**
     * @var ExtensionCacheRepository
     */
    protected $extensionCache;
    /**
     * @var ExtensionFactory
     */
    protected $extensionFactory;

    function __construct(
        FlagrowApi $client,
        Dispatcher $events,
        CacheClearJob $cacheClearJob,
        PackageManager $packageManager,
        ExtensionManager $extensionManager,
        ExtensionCacheRepository $extensionCache,
        ExtensionFactory $extensionFactory
    )
    {
        $this->flagrowApi = $client;
        $this->events = $events;
        $this->cacheClearJob = $cacheClearJob;
        $this->packageManager = $packageManager;
        $this->extensionManager = $extensionManager;
        $this->extensionCache = $extensionCache;
        $this->extensionFactory = $extensionFactory;
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
            /** @var Extension $extension */

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
     * @param array $params Request parameters
     * @return SearchResults
     * @throws \Exception
     */
    public function index(array $params = [])
    {
        $extensions = $this->extensionFactory->createAll();

        foreach (Arr::get($params, 'filter', []) as $filter => $value) {
            switch ($filter) {
                case 'search':
                    $extensions = $this->filterSearch($extensions, $value);
                    break;
                default:
                    throw new \Exception('Invalid extension filter ' . $filter);
            }
        }

        return new SearchResults(EloquentCollection::make($extensions), true);
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

        return $this->extensionFactory->create($id);
    }

    /**
     * Install an extension.
     *
     * @param string $package
     * @return Extension|null
     */
    public function installExtension($package)
    {
        $this->packageManager->requirePackage($package);

        $extension = $this->getExtension($package);

        $this->cacheClearJob->fire();

        $this->events->fire(
            new ExtensionWasInstalled($extension->getInstalledExtension())
        );

        return $extension;
    }

    /**
     * @param $package
     * @param null|string $version
     * @return Extension|null
     */
    public function updateExtension($package, $version = null)
    {
        $extension = $this->getExtension($package);

        $this->packageManager->updatePackage($extension->getPackage());

        $this->extensionManager->migrate($extension->getInstalledExtension());

        $this->cacheClearJob->fire();

        $this->events->fire(
            new ExtensionWasUpdated($extension->getInstalledExtension())
        );

        return $this->getExtension($package);
    }

    /**
     * @param $package
     * @return Extension|null
     */
    public function removeExtension($package)
    {
        $extension = $this->getExtension($package);

        if ($extension->isEnabled()) {
            $this->extensionManager->disable($extension->id);
        }

        $this->extensionManager->migrateDown($extension->getInstalledExtension());

        $this->packageManager->removePackage($extension->getPackage());

        $installedExtension = $extension->getInstalledExtension();

        // This can't be updated automaticall by calling getExtension() again before we haven't reloaded the extension manager
        $extension->setInstalledExtension(null);

        $this->cacheClearJob->fire();

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
        $response = $this->flagrowApi->post('packages/favorite', [
            'form_params' => [
                'package_id' => $package,
                'favorite' => $favorite,
            ],
        ]);

        if (in_array($response->getStatusCode(), [200, 201])) {
            $this->extensionCache->updateCacheFromResponse($response);

            return $this->extensionFactory->create($package);
        }

        if ($response->getStatusCode() === 409) {
            return $response;
        }

        return null;
    }
}
