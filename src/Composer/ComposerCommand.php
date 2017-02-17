<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Installer;
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
     * @var ComposerIO
     */
    protected $io;

    /**
     * @var Installer
     */
    protected $installer;

    /**
     * @param $composerHome
     * @param $vendorDir
     */
    public function __construct($composerHome, $vendorDir)
    {
        $this->composerHome = $composerHome;
        $this->vendorDir = $vendorDir;
    }

    /**
     * Setup the underlying Composer Installer command
     */
    public function createInstaller()
    {
        putenv('COMPOSER_HOME='.$this->composerHome);

        $this->io = new ComposerIO;

        ComposerFactory::setVendorDir($this->vendorDir);
        $composer = ComposerFactory::create($this->io);

        $this->installer = Installer::create($this->io, $composer);
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
     * @return string Command output
     */
    public function update()
    {
        $this->createInstaller();

        $this->installer->setUpdate(true);
        $this->installer->setSkipSuggest(true);

        return $this->doInstallerRun();
    }
}
