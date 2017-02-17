<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Json\JsonManipulator;

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
}
