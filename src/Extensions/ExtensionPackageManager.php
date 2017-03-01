<?php

namespace Flagrow\Bazaar\Extensions;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Exceptions\FilePermissionException;
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

    protected function getComposerJsonPath()
    {
        return $this->app->basePath().'/composer.json';
    }

    public function getComposerCommand()
    {
        return new ComposerCommand($this->getComposerHome(), $this->getComposerTmpVendorDir(), $this->getComposerJsonPath());
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
        $this->prepareDirectories();
        $startTime = $this->beforeCommandStart();

        $output = $this->getComposerCommand()->update();

        $this->logCommandResult($startTime, $output, 'update');
        $this->switchVendorDirectories();
    }

    public function requirePackage($package)
    {
        $this->prepareDirectories();
        $startTime = $this->beforeCommandStart();

        $output = $this->getComposerCommand()->requires($package);

        $this->logCommandResult($startTime, $output, 'require');
        $this->switchVendorDirectories();
    }

    public function removePackage($package)
    {
        $this->prepareDirectories();
        $startTime = $this->beforeCommandStart();

        $output = $this->getComposerCommand()->remove($package);

        $this->logCommandResult($startTime, $output, 'remove');
        $this->switchVendorDirectories();
    }

    /**
     * Helper to get microtime before launching the command
     * @return float
     */
    public function beforeCommandStart()
    {
        return microtime(true);
    }

    /**
     * Directory logic that has to run prior to composer
     */
    public function prepareDirectories()
    {
        $this->checkFilePermissions();
        $this->filesystem->deleteDirectory($this->getComposerTmpVendorDir());
    }

    /**
     * Directory logic that has to run after composer
     */
    public function switchVendorDirectories()
    {
        $this->filesystem->deleteDirectory($this->getComposerVendorDir());
        $this->filesystem->move($this->getComposerTmpVendorDir(), $this->getComposerVendorDir());
    }

    /**
     * Write output & stats about the command in the log file
     * @param $startTime microtime at the start if the command
     * @param $commandOutput
     * @param $commandName A name to display in the log with the output & stats
     */
    public function logCommandResult($startTime, $commandOutput, $commandName)
    {
        $endTime = microtime(true);
        $elapsedTime = round($endTime - $startTime); // In s
        $memoryUsed = round(memory_get_peak_usage()/1000000); // In MB

        $this->log->info('Bazaar: running composer command "'.$commandName.'" (Duration: '.$elapsedTime.'s, Memory: '.$memoryUsed.'MB)'.PHP_EOL.$commandOutput);
    }
}
