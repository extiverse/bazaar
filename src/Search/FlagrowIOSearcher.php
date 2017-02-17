<?php

namespace Flagrow\Bazaar\Search;

use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flarum\Core\Search\SearchResults;
use Flarum\Extension\ExtensionManager;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Collection;

class FlagrowIOSearcher extends AbstractExtensionSearcher
{
    /**
     * @var ExtensionManager
     */
    protected $extensionManager;

    public function __construct(ExtensionManager $manager)
    {
        $this->extensionManager = $manager;
    }

    protected function getClient()
    {
        return new Client([
            'base_uri' => 'http://localhost:8000/api/',
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer [token]',
            ]
        ]);
    }

    public function createExtension($apiPackage)
    {
        $extension = Extension::createFromAttributes($apiPackage['attributes']);

        $installedExtension = $this->extensionManager->getExtension($extension->getShortName());

        if (!is_null($installedExtension)) {
            $extension->setInstalledExtension($installedExtension);
        }

        return $extension;
    }

    public function search($limit = null, $offset = 0)
    {
        $responseHtml = $this->getClient()->get('packages', [
            'json' => [
                'page' => $offset,
                //'offset' => $offset,
                //'limit' => $limit,
            ],
        ]);

        $responseJson = json_decode($responseHtml->getBody(), true);

        $packages = $responseJson['data'];
        $pagination = $responseJson['meta']['pagination'];

        $areMoreResults = $pagination['total_pages'] > $pagination['current_page'];

        $extensions = new Collection();

        foreach ($packages as $package) {
            $extensions->push($this->createExtension($package));
        }

        return new SearchResults($extensions, $areMoreResults);
    }
}
