<?php

namespace Flagrow\Bazaar\Composer\Commands;

use Composer\Package\Version\VersionSelector;
use Flagrow\Bazaar\Exceptions\ComposerException;

class RequireCommand extends BaseCommand
{
    /**
     * @inheritdoc
     */
    protected function handle(array $packages = null)
    {
        if (count($packages) !== 1) {
            // TODO: implement multiple packages handling
            throw new ComposerException('Multiple package require are not supported at the time');
        }

        $versionSelector = new VersionSelector($this->getFileEditor()->getPool($this->getIO()));
        // TODO: php version is omitted when calling findBestCandidate, but it should be to reflect the original require command
        $bestCandidate = $versionSelector->findBestCandidate($packages[0]);
        $version = $versionSelector->findRecommendedRequireVersion($bestCandidate);

        $this->getFileEditor()->addPackage($packages[0], $version);
        $this->getFileEditor()->saveToFile();
    }
}
