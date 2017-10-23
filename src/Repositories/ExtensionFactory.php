<?php

namespace Flagrow\Bazaar\Repositories;

use Flagrow\Bazaar\Extensions\Extension;
use Flarum\Extension\ExtensionManager;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ExtensionFactory
{
    /**
     * @var ExtensionCacheRepository
     */
    protected $flagrowCache;

    /**
     * @var ExtensionManager
     */
    protected $manager;

    public function __construct(ExtensionCacheRepository $flagrowCache, ExtensionManager $manager)
    {
        $this->flagrowCache = $flagrowCache;
        $this->manager = $manager;
    }

    /**
     * Internal method to create the extension with various sources for the Flagrow cache
     * @param array $flagrowExtension
     * @return Extension
     */
    protected function createFromApiData($flagrowExtension)
    {
        $extension = Extension::createFromAttributes(Arr::get($flagrowExtension, 'attributes'));

        $installedExtension = $this->manager->getExtension($extension->getShortName());

        if ($installedExtension) {
            $extension->setInstalledExtension($installedExtension);
        }

        return $extension;
    }

    /**
     * Builds an extension object from the Flagrow cache and the Flarum manager if available
     * @param string $extensionId Extension id (with $)
     * @return Extension
     */
    public function create($extensionId)
    {
        $flagrowExtension = $this->flagrowCache->get($extensionId);

        if (!$flagrowExtension) {
            return null;
        }

        return $this->createFromApiData($flagrowExtension);
    }

    /**
     * Builds the full list of extensions from the Flagrow cache
     * @return Collection
     */
    public function createAll()
    {
        return $this->flagrowCache->index()->map(function($flagrowExtension) {
            return $this->createFromApiData($flagrowExtension);
        });
    }
}
