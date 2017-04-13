<?php

namespace Flagrow\Bazaar\Repositories;

use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flagrow\Bazaar\Traits\Cachable;
use Flarum\Core\Search\SearchResults;
use Flarum\Extension\ExtensionManager as CoreManager;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Collection;


class ExtensionRepository
{
    use Cachable;
    /**
     * @var Extension
     */
    protected $extension;
    /**
     * @var CoreManager
     */
    protected $coreManager;
    /**
     * @var FlagrowApi
     */
    private $client;

    function __construct(CoreManager $coreManager, FlagrowApi $client)
    {
        $this->coreManager = $coreManager;
        $this->client = $client;
    }

    /**
     * @return SearchResults
     */
    public function index()
    {
        $query = [
            'page[size]' => 9999,
            'page[number]' => 1, // Offset is zero-based, page number is 1-based
            'sort' => 'title' // Sort by package name per default
        ];

        $hash = 'flagrow.io.search.list';

        $response = $this->getOrSetCache($hash, function() use ($query) {
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
     * @param $id
     * @return Extension
     */
    public function getExtension($id)
    {
        $response = $this->client->get("packages/$id");

        if ($response->getStatusCode() == 200) {
            $json = json_decode($response->getBody()->getContents(), true);
            return $this->createExtension(Arr::get($json, 'data', []));
        }
    }

    /**
     * Create an Extension object and map all data sources.
     * @param array $apiPackage
     * @return Extension
     */
    public function createExtension(array $apiPackage)
    {
        $extension = Extension::createFromAttributes($apiPackage['attributes']);

        $installedExtension = $this->coreManager->getExtension($extension->getShortName());

        if (!is_null($installedExtension)) {
            $extension->setInstalledExtension($installedExtension);
        }

        $this->flushCacheKey('flagrow.io.search.list');

        return $extension;
    }
}
