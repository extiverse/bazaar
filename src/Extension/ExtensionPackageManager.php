<?php

namespace Flagrow\Bazaar\Extension;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Exception\FilePermissionException;
use Flarum\Foundation\Application;
use Illuminate\Filesystem\Filesystem;

class ExtensionPackageManager
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @var Filesystem
     */
    protected $filesystem;

    public function __construct(Application $app, Filesystem $filesystem)
    {
        $this->app = $app;
        $this->filesystem = $filesystem;
    }

    public function getComposerVendorDir()
    {
        return $this->app->basePath().'/vendor';
    }

    public function getComposerTmpVendorDir()
    {
        // Placing the temporary vendor dir at the same level is easier for permission check
        // And also keeps symlinks pointing outside vendor working
        return $this->app->basePath().'/vendor2';
    }

    public function getComposerHome()
    {
        return $this->app->storagePath().'/composer-home';
    }

    public function checkFilePermissions()
    {
        $pathsToCheck = [
            $this->app->basePath(),
            $this->app->basePath().'/composer.json',
            $this->app->basePath().'/composer.lock',
            $this->getComposerVendorDir(),
        ];

        foreach ($pathsToCheck as $path) {
            if (!is_writable($path)) {
                throw new FilePermissionException('Write permission missing for '.$path);
            }
        }
    }

    public function updatePackages()
    {
        $this->checkFilePermissions();

        $this->filesystem->deleteDirectory($this->getComposerTmpVendorDir());

        $command = new ComposerCommand($this->getComposerHome(), $this->getComposerTmpVendorDir());
        $command->update();

        $this->filesystem->deleteDirectory($this->getComposerVendorDir());
        $this->filesystem->move($this->getComposerTmpVendorDir(), $this->getComposerVendorDir());
    }
}
