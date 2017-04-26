<?php

namespace Flagrow\Bazaar\Composer\Commands;

use Composer\Package\Version\VersionSelector;

class RequireCommand extends BaseCommand
{
    /**
     * @inheritdoc
     */
    protected function handle(array $packages = null)
    {
        $versionSelector = new VersionSelector($this->getFileEditor()->getPool($this->getIO()));

        if ($packages === null) {
            $packages = [];
        }

        foreach ($packages as $package) {
            list($package, $version) = explode(':', $package);

            $candidate = $versionSelector->findBestCandidate($package, $version);

            if ($candidate) {
                $version = $candidate->getPrettyVersion();
            }

            $this->getFileEditor()->addPackage($package, $version);
        }

        if (!empty($packages)) {
            $this->getFileEditor()->saveToFile();
        }
    }
}
