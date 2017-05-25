<?php

namespace Flagrow\Bazaar\Tests\Composer;

class DeleteCommandTest extends BaseCommandTest
{
    public function testDeleteExistingPackage()
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
        $this->assertPackageNotRegistered('nesbot/carbon');
        $this->assertPackageNotInstalled('nesbot/carbon');
    }
}
