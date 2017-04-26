<?php

namespace Bazaar\Tests\Composer;

class UpdateCommandTest extends BaseCommandTest
{
    public function testUpdateExistingPackage()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '1.22.0', // An update to at least 1.22.1 is available
                'symfony/yaml' => 'v3.2.3', // An update to at least 3.2.4 is available
            ],
        ]);

        // Install an old version on purpose
        $this->getComposerCommand()->update();
        $this->assertPackageInstalled('nesbot/carbon', '1.22.0');

        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '^1.22.0',
                'symfony/yaml' => '^v3.2.3',
            ],
        ]);

        // Do update after changing to allow update
        $this->getComposerCommand()->update('nesbot/carbon');
        $this->assertPackageInstalled('nesbot/carbon');
        $this->assertPackageVersionNotInstalled('nesbot/carbon', '1.22.0'); // Check if old version is no longer used

        // Check other package was not updated
        $this->assertPackageInstalled('symfony/yaml', 'v3.2.3');
    }

    public function testUpdateAllPackages()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '1.22.0', // An update to at least 1.22.1 is available
                'symfony/yaml' => 'v3.2.3', // An update to at least 3.2.4 is available
            ],
        ]);

        // Install an old version on purpose
        $this->getComposerCommand()->update();
        $this->assertPackageInstalled('nesbot/carbon', '1.22.0');
        $this->assertPackageInstalled('symfony/yaml', 'v3.2.3');

        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '^1.22.0',
                'symfony/yaml' => '^v3.2.3',
            ],
        ]);

        // Update all
        $this->getComposerCommand()->update();
        $this->assertPackageInstalled('nesbot/carbon');
        $this->assertPackageVersionNotInstalled('nesbot/carbon', '1.22.0'); // Check if old version is no longer used
        $this->assertPackageInstalled('symfony/yaml');
        $this->assertPackageVersionNotInstalled('symfony/yaml', 'v3.2.3');

    }
}
