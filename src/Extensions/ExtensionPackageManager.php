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

        $startTime = $this->beforeCommandStart();

        $command = new ComposerCommand($this->getComposerHome(), $this->getComposerTmpVendorDir());
        $output = $command->update();

        $this->logCommandResult($startTime, $output, 'update');

        $this->filesystem->deleteDirectory($this->getComposerVendorDir());
        $this->filesystem->move($this->getComposerTmpVendorDir(), $this->getComposerVendorDir());
    }

    public function beforeCommandStart()
    {
        return microtime(true);
    }

    public function logCommandResult($startTime, $commandOutput, $commandName)
    {
        $endTime = microtime(true);
        $elapsedTime = round($endTime - $startTime); // In s
        $memoryUsed = round(memory_get_peak_usage()/1000000); // In MB

        $this->log->info('Bazaar: running composer command "'.$commandName.'" (Duration: '.$elapsedTime.'s, Memory: '.$memoryUsed.'MB)'.PHP_EOL.$commandOutput);
    }
}
