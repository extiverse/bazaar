<?php

namespace Flagrow\Bazaar\Search;

use Flagrow\Bazaar\Extensions\Extension;
use Flarum\Core\Search\SearchResults;
use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;

class FlagrowIOSearcher extends AbstractExtensionSearcher
{
    /**
     * @var ExtensionManager
     */
    protected $extensionManager;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $config;

    /**
     * @var Client
     */
    protected $client;

    /**
     * @var Store
     */
    private $cache;

    /**
     * @param ExtensionManager $manager
     * @param SettingsRepositoryInterface $config
     * @param FlagrowApi $client
     * @param Store $cache
     */
    public function __construct(
        ExtensionManager $manager,
        SettingsRepositoryInterface $config,
        FlagrowApi $client,
        Store $cache
    ) {
        $this->extensionManager = $manager;
        $this->config = $config;
        $this->client = $client;
        $this->cache = $cache;
    }

    /**
     * Create an Extension object and map all data sources
     * @param array $apiPackage
     * @return Extension
     */
    public function createExtension(array $apiPackage)
    {
        $extension = Extension::createFromAttributes($apiPackage['attributes']);

        $installedExtension = $this->extensionManager->getExtension($extension->getShortName());

        if (!is_null($installedExtension)) {
            $extension->setInstalledExtension($installedExtension);
        }

        return $extension;
    }

    /**
     * @inheritdoc
     */
    public function search($limit = null, $offset = 0)
    {
        $query = [
            'page[size]' => 9999,
            'page[number]' => $offset + 1, // Offset is zero-based, page number is 1-based
            'sort' => 'title' // Sort by package name per default
        ];

        $hash = sprintf("%s:%s",
            'flagrow.io.search',
            serialize($query)
        );

        $response = $this->getOrSetCache(md5($hash), function() use ($query) {
            $response = $this->client->get('packages', compact('query'));

            return (string) $response->getBody();
        });

        $json = json_decode($response, true);

        $areMoreResults = Arr::get($json, 'meta.pages_total', 0) > Arr::get($json, 'meta.pages_current', 0);

        $extensions = Collection::make(
            Arr::get($json, 'data', [])
        )->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');

        return new SearchResults($extensions, $areMoreResults);
    }

    /**
     * @param $hash
     * @param $callable
     * @return mixed
     */
    protected function getOrSetCache($hash, $callable)
    {
        if (app()->inDebugMode()) {
            return $callable();
        }

        $cached = $this->cache->get($hash);

        if (!$cached) {
            $cached = $callable();

            $this->cache->put($hash, $cached, 60);
        }

        return $cached;
    }
}
