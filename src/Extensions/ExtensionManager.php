<?php

namespace Flagrow\Bazaar\Extensions;

use Flarum\Extension\ExtensionManager as BaseManager;

class ExtensionManager extends BaseManager
{
    public function getPackageManager()
    {
        return $this->app->make(ExtensionPackageManager::class);
    }

    public function install($extensionId, $version = null)
    {
        $package = ExtensionUtils::idToPackage($extensionId);
        $this->getPackageManager()->requirePackage($package);
    }

    public function uninstall($extensionId)
    {
        // Get the ids we need from the Bazaar extension id
        $shortName = ExtensionUtils::idToShortName($extensionId);
        $package   = ExtensionUtils::idToPackage($extensionId);

        // TODO: run the uninstalled event after our own logic
        parent::uninstall($shortName);

        $this->getPackageManager()->removePackage($package);
    }
}
