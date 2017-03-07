<?php

namespace Flagrow\Bazaar\Search;

use Flagrow\Bazaar\Search\FlagrowApi;
use Flagrow\Bazaar\Extensions\Extension;
use Flarum\Core\Search\SearchResults;
use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
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
     * @param ExtensionManager $manager
     * @param SettingsRepositoryInterface $config
     * @param FlagrowApi $client
     */
    public function __construct(ExtensionManager $manager, SettingsRepositoryInterface $config, FlagrowApi $client)
    {
        $this->extensionManager = $manager;
        $this->config = $config;
        $this->client = $client;
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
        $response = $this->client->get('packages', [
            'query' => [
                'page[size]' => 9999,
                'page[number]' => $offset + 1, // Offset is zero-based, page number is 1-based
                'sort' => 'title' // Sort by package name per default
            ],
        ]);

        $json = json_decode($response->getBody(), true);

        $areMoreResults = Arr::get($json, 'meta.pages_total', 0) > Arr::get($json, 'meta.pages_current', 0);

        $extensions = Collection::make(
            Arr::get($json, 'data', [])
        )->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');

        return new SearchResults($extensions, $areMoreResults);
    }
}
