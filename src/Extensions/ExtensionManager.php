<?php

namespace Flagrow\Bazaar\Extensions;

use Flagrow\Bazaar\Jobs\InstallPackage;
use Flagrow\Bazaar\Jobs\RemovePackage;
use Flarum\Event\ExtensionWasUninstalled;
use Flarum\Extension\ExtensionManager as BaseManager;
use Illuminate\Contracts\Events\Dispatcher;

class ExtensionManager
{

    /**
     * @var BaseManager
     */
    protected $extensions;

    /**
     * @var Dispatcher
     */
    protected $dispatcher;

    /**
     * @var ExtensionPackageManager
     */
    protected $packageManager;

    /**
     * ExtensionManager constructor.
     * @param BaseManager $extensions
     * @param Dispatcher $dispatcher
     * @param ExtensionPackageManager $packageManager
     */
    public function __construct(BaseManager $extensions, Dispatcher $dispatcher, ExtensionPackageManager $packageManager)
    {
        $this->extensions = $extensions;
        $this->dispatcher = $dispatcher;
        $this->packageManager = $packageManager;
        // @TODO temporary work around to increase memory
        @ini_set('memory_limit', '1G');
    }

    /**
     * @param $extensionId
     * @param null $version
     */
    public function install($extensionId, $version = null)
    {
        $package = ExtensionUtils::idToPackage($extensionId);
        InstallPackage::launch($package);
    }

    /**
     * @param string $extensionId
     */
    public function uninstall($extensionId)
    {
        // Get the ids we need from the Bazaar extension id
        $name = ExtensionUtils::idToShortName($extensionId);
        $package = ExtensionUtils::idToPackage($extensionId);

        $extension = $this->extensions->getExtension($name);

        if ($this->extensions->isEnabled($name)) {
            $this->extensions->disable($name);
        }

        $this->extensions->migrateDown($extension);
        // @TODO this is broken in Flarum b6, fix is committed
//        $this->unpublishAssets($extension);

        $extension->setInstalled(false);

        $this->dispatcher->fire(new ExtensionWasUninstalled($extension));

        // TODO: run the uninstalled event after our own logic
//        parent::uninstall($shortName);

        RemovePackage::launch($package);
    }
}
