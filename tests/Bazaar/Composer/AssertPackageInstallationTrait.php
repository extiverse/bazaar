<?php

namespace Tests\Bazaar\Composer;

use Illuminate\Support\Arr;

trait AssertPackageInstallationTrait
{
    public function getInstalledPackages()
    {
        $json = json_decode($this->filesystem->get($this->getComposerWorkingDir().'/vendor/composer/installed.json'));

        return Arr::pluck($json, 'version', 'name');
    }

    public function isPackageInstalled($package)
    {
        $installed = $this->getInstalledPackages();

        return array_key_exists($package, $installed);
    }

    public function isPackageVersionInstalled($package, $version)
    {
        $installed = $this->getInstalledPackages();

        return array_key_exists($package, $installed) && $installed[$package] === $version;
    }

    public function assertPackageInstalled($package, $version = null)
    {
        $this->assertTrue($this->isPackageInstalled($package), 'Package '.$package.' should be installed');

        if (!is_null($version)) {
            $this->assertTrue($this->isPackageVersionInstalled($package, $version), 'Version '.$version.' should be installed for package '.$package);
        }
    }

    public function assertPackageNotInstalled($package)
    {
        $this->assertFalse($this->isPackageInstalled($package), 'Package '.$package.' should not be installed');
    }

    public function assertPackageVersionNotInstalled($package, $version)
    {
        $this->assertFalse($this->isPackageVersionInstalled($package, $version), 'Version '.$version.' should not be installed for package '.$package);
    }
}
