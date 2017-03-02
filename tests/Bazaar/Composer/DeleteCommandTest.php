<?php

namespace Tests\Bazaar\Composer;

class DeleteCommandTest extends BaseCommandTest
{
    public function test_delete_existing_package()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => [
                'nesbot/carbon' => '1.22.1',
            ],
        ]);

        $this->getComposerCommand()->requires('nesbot/carbon');
        $this->assertPackageInstalled('nesbot/carbon');

        $this->getComposerCommand()->remove('nesbot/carbon');
        $this->assertPackageNotInJson('nesbot/carbon');
        $this->assertPackageNotInstalled('nesbot/carbon');
    }
}
