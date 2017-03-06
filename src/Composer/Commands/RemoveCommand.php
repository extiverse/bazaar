<?php

namespace Flagrow\Bazaar\Composer\Commands;

class RemoveCommand extends BaseCommand
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

        $this->getFileEditor()->removePackage($packages[0]);
        $this->getFileEditor()->saveToFile();

        $this->getInstaller()->setUpdate(true);
        $this->getInstaller()->setSkipSuggest(true);
        $this->getInstaller()->setUpdateWhitelist($packages);
        $this->getInstaller()->setWhitelistDependencies(true);
    }
}
