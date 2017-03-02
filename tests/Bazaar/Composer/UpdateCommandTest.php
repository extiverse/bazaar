<?php

namespace Tests\Bazaar\Composer;

class UpdateCommandTest extends BaseCommandTest
{
    public function test_update_existing_package()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '1.22.0',
            ],
        ]);

        // Install an old version on purpose
        $this->getComposerCommand()->update();
        $this->assertPackageVersionInstalled('nesbot/carbon', '1.22.0');

        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '^1.22.0',
            ],
        ]);

        // Do update after changing to allow update
        $this->getComposerCommand()->update('nesbot/carbon');
        $this->assertPackageInstalled('nesbot/carbon');
        $this->assertPackageVersionNotInstalled('nesbot/carbon', '1.22.0'); // Check if old version is no longer used
    }
}
