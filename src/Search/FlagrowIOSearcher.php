<?php

namespace Flagrow\Bazaar\Search;

use Flagrow\Bazaar\Extensions\Extension;
use Flarum\Core\Search\SearchResults;
use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Collection;

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
        return new Client([
            'base_uri' => 'http://localhost:8000/api/',
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
        $responseHtml = $this->getClient()->get('packages', [
            'query' => [
                'page[number]' => $offset + 1, // Offset is zero-based, page number is 1-based
            ],
        ]);

        $responseJson = json_decode($responseHtml->getBody(), true);

        $packages = $responseJson['data'];
        $areMoreResults = $responseJson['meta']['pages_total'] > $responseJson['meta']['pages_current'];

        $extensions = new Collection();

        foreach ($packages as $package) {
            $extensions->push($this->createExtension($package));
        }

        return new SearchResults($extensions, $areMoreResults);
    }
}
