<?php

namespace Flagrow\Bazaar\Extension;

use Flagrow\Bazaar\Composer\ComposerFileEditor;
use Flarum\Database\Migrator;
use Flarum\Extension\ExtensionManager as BaseManager;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;

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

    public function __construct(SettingsRepositoryInterface $config, Application $app, Migrator $migrator, Dispatcher $dispatcher, Filesystem $filesystem)
    {
        parent::__construct($config, $app, $migrator, $dispatcher, $filesystem);

        $this->composerFileEditor = new ComposerFileEditor($this->filesystem->get($this->getComposerJsonPath()));
        $this->composerCommand = new ComposerCommand();
    }

    public function install($name, $version)
    {
        $this->composerFileEditor->addPackage($name, $version);

        $this->composerCommand->update();
    }

    public function uninstall($name)
    {
        // TODO: run the uninstalled event after our own logic
        parent::uninstall($name);

        $this->composerFileEditor->removePackage($name);

        $this->composerCommand->update();
    }

    protected function getComposerJsonPath()
    {
        return $this->app->basePath().'/composer.json';
    }

    protected function saveComposerFile()
    {
        $this->filesystem->put($this->getComposerJsonPath(), $this->composerFileEditor->getContents());
    }
}
