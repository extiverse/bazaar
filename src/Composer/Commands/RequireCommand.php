<?php

namespace Extiverse\Bazaar\Composer\Commands;

use Composer\Package\Version\VersionSelector;
use Extiverse\Bazaar\Exceptions\ComposerException;

class RequireCommand extends BaseCommand
{
    /**
     * @inheritdoc
     */
    protected function handle(array $packages = null)
    {
        $versionSelector = new VersionSelector($this->getFileEditor()->getPool($this->getComposer()));

        if ($packages === null) {
            $packages = [];
        }

        foreach ($packages as $package) {
            $candidate = $versionSelector->findBestCandidate($package);

            if ($candidate) {
                $this->getFileEditor()->addPackage(
                    $candidate->getPrettyName(),
                    $versionSelector->findRecommendedRequireVersion($candidate)
                );
            } else {
                // If we don't throw an error here, Composer will quitely show a warning
                // "Package "vendor/package" listed for update is not installed. Ignoring." and end "successfully",
                // even if the package we wanted installed is not in fact installed.
                // This also cause issues with the Controller who expect the package to be installed
                // and tries to return its local version data and fails
                throw new ComposerException('Cound not find a candidate for "' . $package . '"');
            }
        }

        if (!empty($packages)) {
            $this->getFileEditor()->saveToFile();

            // We can't re-use the Composer we used to change the file because it only knows about the previous config
            // For the installation of new packages to work we have to force it to be re-created
            $this->refreshComposer();
        }
    }
}
