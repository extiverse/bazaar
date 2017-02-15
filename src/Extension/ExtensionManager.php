<?php

namespace Flagrow\Bazaar\Extension;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerFileEditor;
use Flarum\Extension\ExtensionManager as BaseManager;

class ExtensionManager extends BaseManager
{
    /**
     * @var ComposerFileEditor
     */
    protected $composerFileEditor;

    /**
     * @var ComposerCommand
     */
    protected $composerCommand;

    protected function getFileEditor()
    {
        return new ComposerFileEditor($this->filesystem->get($this->getComposerJsonPath()));
    }

    protected function getCommand()
    {
        return new ComposerCommand();
    }

    public function install($name, $version)
    {
        $this->getFileEditor()->addPackage($name, $version);

        $this->getCommand()->update();
    }

    public function uninstall($name)
    {
        // TODO: run the uninstalled event after our own logic
        parent::uninstall($name);

        $this->getFileEditor()->removePackage($name);

        $this->getCommand()->update();
    }

    protected function getComposerJsonPath()
    {
        return $this->app->basePath().'/composer.json';
    }

    protected function saveComposerFile()
    {
        $this->filesystem->put($this->getComposerJsonPath(), $this->getFileEditor()->getContents());
    }
}
