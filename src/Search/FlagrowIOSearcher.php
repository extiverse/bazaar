<?php

namespace Flagrow\Bazaar\Search;

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
     * @param ExtensionManager $manager
     * @param SettingsRepositoryInterface $config
     */
    public function __construct(ExtensionManager $manager, SettingsRepositoryInterface $config)
    {
        $this->extensionManager = $manager;
        $this->config = $config;
    }

    /**
     * Get a Guzzle client configured for Flagrow API
     * @return Client
     */
    protected function getClient()
    {
        $host = Arr::get(app('flarum.config'),'flagrow', 'https://flagrow.io');

        return new Client([
            'base_uri' => "$host/api/",
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$this->config->get('flagrow.bazaar.api_token'),
            ]
        ]);
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
        $response = $this->getClient()->get('packages', [
            'query' => [
                'page[number]' => $offset + 1, // Offset is zero-based, page number is 1-based
            ],
        ]);

        $json = json_decode($response->getBody(), true);

        $areMoreResults = $json['meta']['pages_total'] > $json['meta']['pages_current'];

        $extensions = Collection::make(
            Arr::get($json, 'data', [])
        )->map(function ($package) {
            return $this->createExtension($package);
        })->keyBy('id');

        return new SearchResults($extensions, $areMoreResults);
    }
}
