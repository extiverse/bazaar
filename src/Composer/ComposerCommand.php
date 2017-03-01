<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Installer;
use Composer\Package\Version\VersionSelector;
use Flagrow\Bazaar\Exceptions\CannotWriteComposerFileException;
use Flagrow\Bazaar\Exceptions\ComposerException;

class ComposerCommand
{
    /**
     * @var string
     */
    protected $composerHome;

    /**
     * @var string
     */
    protected $vendorDir;

    /**
     * @var string
     */
    protected $composerJsonPath;

    /**
     * @var ComposerIO
     */
    protected $io;

    /**
     * @var Installer
     */
    protected $installer;

    /**
     * @var ComposerFileEditor
     */
    protected $fileEditor;

    /**
     * @var string
     */
    protected $composerJsonBackup;

    /**
     * @param $composerHome
     * @param $vendorDir
     */
    public function __construct($composerHome, $vendorDir, $composerJsonPath)
    {
        $this->composerHome = $composerHome;
        $this->vendorDir = $vendorDir;
        $this->composerJsonPath = $composerJsonPath;
    }

    public function getIO()
    {
        if ($this->io) {
            return $this->io;
        }

        $this->io = new ComposerIO;

        return $this->io;
    }

    public function configureComposerEnv()
    {
        putenv('COMPOSER_HOME='.$this->composerHome);
        ComposerFactory::setVendorDir($this->vendorDir);
    }

    /**
     * Setup the underlying Composer Installer command
     */
    public function createInstaller()
    {
        $this->configureComposerEnv();
        $composer = ComposerFactory::create($this->getIO());

        $this->installer = Installer::create($this->getIO(), $composer);
    }

    /**
     * Setup a file editor for `composer.json` and save a backup of its content
     */
    public function createFileEditor()
    {
        $this->composerJsonBackup = file_get_contents($this->composerJsonPath);
        $this->fileEditor = new ComposerFileEditor($this->composerJsonBackup);
    }

    protected function writeComposerJson($content)
    {
        $status = file_put_contents($this->composerJsonPath, $content);

        if ($status === false) {
            throw new CannotWriteComposerFileException();
        }
    }

    /**
     * Save the changes to `composer.json`
     */
    public function saveComposerJson()
    {
        $this->writeComposerJson($this->fileEditor->getContents());
    }

    /**
     * Restore the backup on top of `composer.json`
     */
    public function restoreComposerJson()
    {
        $this->writeComposerJson($this->fileEditor->composerJsonBackup);
    }

    /**
     * Perform the underlying Composer Installer command and handle output
     * @return string Command output
     * @throws ComposerException
     */
    public function doInstallerRun()
    {
        $exitCode = $this->installer->run();

        if ($exitCode !== 0) {
            // Exceptions should be caught by the ComposerIO handler
            // This is only for errors that the installer did not report verbally
            throw new ComposerException('Installer run error');
        }

        return $this->io->getOutput();
    }

    /**
     * Runs `composer update`
     * @param array $packages List of packages to update. Empty for all
     * @return string Command output
     */
    public function update($packages = [])
    {
        $this->createInstaller();

        $this->installer->setUpdate(true);
        $this->installer->setSkipSuggest(true);
        $this->installer->setUpdateWhitelist($packages);

        return $this->doInstallerRun();
    }

    /**
     * Runs `composer require`
     * @param string $package
     * @return string
     */
    public function requires($package)
    {
        // Needs to be called before getPool to have the fileEditor setup
        $this->createFileEditor();
        // Environment must be setup for getPool to work
        $this->configureComposerEnv();

        $versionSelector = new VersionSelector($this->fileEditor->getPool($this->getIO()));
        // TODO: php version is ommited when calling findBestCandidate, but it should be to reflect the original require command
        $bestCandidate = $versionSelector->findBestCandidate($package);
        $version = $versionSelector->findRecommendedRequireVersion($bestCandidate);

        $this->fileEditor->addPackage($package, $version);
        $this->saveComposerJson();

        $output = null;

        try {
            $this->createInstaller();

            $this->installer->setUpdate(true);
            $this->installer->setSkipSuggest(true);
            $this->installer->setUpdateWhitelist([$package]);
            $this->installer->setWhitelistDependencies(true); // TODO: is false in the original require command

            $output = $this->doInstallerRun();
        } catch (ComposerException $exception) {
            $this->restoreComposerJson();
            throw $exception;
        }

        return $output;
    }

    public function remove($package)
    {
        $this->createFileEditor();
        $this->fileEditor->removePackage($package);
        $this->saveComposerJson();

        $output = null;

        try {
            $this->createInstaller();

            $this->installer->setUpdate(true);
            $this->installer->setSkipSuggest(true);
            $this->installer->setUpdateWhitelist([$package]);
            $this->installer->setWhitelistDependencies(true);

            $output = $this->doInstallerRun();
        } catch (ComposerException $exception) {
            $this->restoreComposerJson();
            throw $exception;
        }

        return $output;
    }
}
