<?php

namespace Flagrow\Bazaar\Extensions;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerEnvironment;
use Flagrow\Bazaar\Composer\ComposerOutput;
use Flarum\Foundation\Application;
use Illuminate\Filesystem\Filesystem;
use Psr\Log\LoggerInterface;

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

    /**
     * @var LoggerInterface
     */
    protected $log;

    public function __construct(Application $app, Filesystem $filesystem, LoggerInterface $log)
    {
        $this->app = $app;
        $this->filesystem = $filesystem;
        $this->log = $log;
    }

    public function getComposerInstallRoot()
    {
        return $this->app->basePath();
    }

    public function getComposerHome()
    {
        return $this->app->storagePath().'/composer-home';
    }

    public function getComposerCommand()
    {
        $env = new ComposerEnvironment($this->getComposerInstallRoot(), $this->getComposerHome(), $this->filesystem);

        return new ComposerCommand($env);
    }

    public function updatePackages()
    {
        $output = $this->getComposerCommand()->update();

        $this->logCommandResult($output, 'update');
    }

    public function requirePackage($package)
    {
        $output = $this->getComposerCommand()->requires($package);

        $this->logCommandResult($output, 'require');
    }

    public function removePackage($package)
    {
        $output = $this->getComposerCommand()->remove($package);

        $this->logCommandResult($output, 'remove');
    }

    /**
     * Write output & stats about the command in the log file
     * @param ComposerOutput $output
     * @param string $commandName
     */
    public function logCommandResult(ComposerOutput $output, $commandName)
    {
        $this->log->info('Bazaar: running composer command "'.$commandName.'" (Duration: '.$output->getDuration().'s, Memory: '.$output->getMemory().'MB)'.PHP_EOL.$output->getOutput());
    }
}
