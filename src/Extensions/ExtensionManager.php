<?php

namespace Flagrow\Bazaar\Extensions;

use Flarum\Event\ExtensionWasUninstalled;
use Flarum\Extension\ExtensionManager as BaseManager;

class ExtensionManager extends BaseManager
{
    public function getPackageManager()
    {
        return $this->app->make(ExtensionPackageManager::class);
    }

    public function install($extensionId, $version = null)
    {
        // @TODO temporary work around to increase memory
        ini_set('memory_limit', '2gb');

        $package = ExtensionUtils::idToPackage($extensionId);
        $this->getPackageManager()->requirePackage($package);
    }

    public function uninstall($extensionId)
    {
        // Get the ids we need from the Bazaar extension id
        $name = ExtensionUtils::idToShortName($extensionId);
        $package   = ExtensionUtils::idToPackage($extensionId);

        $extension = $this->getExtension($name);

        $this->disable($name);

        $this->migrateDown($extension);

        // @TODO this is broken in Flarum b6, fix is committed
//        $this->unpublishAssets($extension);

        $extension->setInstalled(false);

        $this->dispatcher->fire(new ExtensionWasUninstalled($extension));

        // TODO: run the uninstalled event after our own logic
//        parent::uninstall($shortName);

        $this->getPackageManager()->removePackage($package);
    }
}
