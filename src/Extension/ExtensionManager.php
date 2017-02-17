<?php

namespace Flagrow\Bazaar\Extension;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerFileEditor;
use Flagrow\Bazaar\Exception\CannotWriteComposerFileException;
use Flarum\Extension\ExtensionManager as BaseManager;

class ExtensionManager extends BaseManager
{
    /**
     * @var ComposerFileEditor
     */
    protected static $composerFileEditor;

    /**
     * @var ComposerCommand
     */
    protected $composerCommand;

    protected function getFileEditor()
    {
        if (!static::$composerFileEditor) {
            static::$composerFileEditor = new ComposerFileEditor($this->filesystem->get($this->getComposerJsonPath()));
        }

        return static::$composerFileEditor;
    }

    public function install($name, $version)
    {
        $this->getFileEditor()->addPackage($name, $version);
        $this->saveComposerFile();

        $this->updatePackages();
    }

    public function uninstall($shortName)
    {
        // TODO: run the uninstalled event after our own logic
        parent::uninstall($shortName);

        // Convert shortcode back to package name by looking inside install.json
        $name = $this->getExtension($shortName)->name;

        $this->getFileEditor()->removePackage($name);
        $this->saveComposerFile();

        $this->updatePackages();
    }

    protected function getComposerJsonPath()
    {
        return $this->app->basePath().'/composer.json';
    }

    protected function saveComposerFile()
    {
        $contents = $this->filesystem->put($this->getComposerJsonPath(), $this->getFileEditor()->getContents());

        if ($contents === false) {
            throw new CannotWriteComposerFileException();
        }
    }

    public function updatePackages()
    {
        $composerHome = $this->app->storagePath().'/composer-home';
        $vendorDir = $this->app->basePath().'/vendor';
        $vendorDirTmp = $this->app->storagePath().'/tmp/composer-vendor';

        $this->filesystem->deleteDirectory($vendorDirTmp);

        $command = new ComposerCommand($composerHome, $vendorDirTmp);

        $command->update();
    }
}
