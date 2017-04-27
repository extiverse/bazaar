<?php

namespace Flagrow\Bazaar\Tests\Composer;

use Illuminate\Support\Arr;

trait AssertPackageRegistrationTrait
{
    public function getRegisteredPackages()
    {
        $json = json_decode($this->filesystem->get($this->getComposerWorkingDir().'/composer.json'), true);

        return Arr::get($json, 'require', []);
    }

    public function isPackageRegistered($package)
    {
        $registered = $this->getRegisteredPackages();

        return array_key_exists($package, $registered);
    }

    public function isPackageVersionRegistered($package, $version)
    {
        $registered = $this->getRegisteredPackages();

        return array_key_exists($package, $registered) && $registered[$package] === $version;
    }

    public function assertPackageRegistered($package, $version = null)
    {
        $this->assertTrue($this->isPackageRegistered($package), 'Package '.$package.' should be in composer.json');

        if (!is_null($version)) {
            $this->assertTrue($this->isPackageVersionRegistered($package, $version), 'Version '.$version.' should be in composer.json for package '.$package);
        }
    }

    public function assertPackageNotRegistered($package)
    {
        $this->assertFalse($this->isPackageVersionRegistered($package, 'Package '.$package.' should not be in composer.json'));
    }

    public function assertPackageVersionNotRegistered($package, $version)
    {
        $this->assertFalse($this->isPackageVersionRegistered($package, $version, 'Version '.$version.' should not be in composer.json for package '.$package));
    }

    public function assertRepositoryRegistered($type, $url)
    {
        $json = json_decode($this->filesystem->get($this->getComposerWorkingDir().'/composer.json'), true);

        $found = false;

        foreach (Arr::get($json, 'repositories', []) as $repository) {
            if (Arr::get($repository, 'url') === $url && Arr::get($repository, 'type') == $type) {
                $found = true;
            }
        }

        $this->assertTrue($found, 'Repository ' . $url . ' of type '. $type . ' not found in composer file');
    }
}
