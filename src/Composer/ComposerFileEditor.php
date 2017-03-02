<?php

namespace Flagrow\Bazaar\Composer;

use Composer\DependencyResolver\Pool;
use Composer\IO\IOInterface;
use Composer\Json\JsonManipulator;
use Composer\Repository\CompositeRepository;
use Composer\Repository\PlatformRepository;
use Composer\Repository\RepositoryFactory;

class ComposerFileEditor
{
    /**
     * @var JsonManipulator
     */
    protected $manipulator;

    public function __construct($content)
    {
        $this->manipulator = new JsonManipulator($content);
    }

    public function getContents()
    {
        return $this->manipulator->getContents();
    }

    /**
     * Add or update a package
     * @param string $package Package name
     * @param string $version Version constraint
     */
    public function addPackage($package, $version)
    {
        $this->manipulator->addLink('require', $package, $version);
    }

    /**
     * Remove a package
     * @param string $package Package name
     */
    public function removePackage($package)
    {
        $this->manipulator->removeSubNode('require', $package);
    }

    /**
     * Get a dependency pool
     * Based on the protected InitCommand::getPool() method of Composer
     * @param IOInterface $io
     * @return Pool
     */
    public function getPool(IOInterface $io)
    {
        $json = json_decode($this->getContents(), true);

        $pool = new Pool(array_key_exists('minimum-stability', $json) ? $json['minimum-stability'] : 'stable');
        $pool->addRepository(new CompositeRepository(array_merge(
            [new PlatformRepository],
            RepositoryFactory::defaultRepos($io)
        )));

        return $pool;
    }
}
