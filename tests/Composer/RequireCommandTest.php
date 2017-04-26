<?php

namespace Bazaar\Tests\Composer;

class RequireCommandTest extends BaseCommandTest
{
    public function testRequireNewPackage()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
            'require' => new \stdClass(),
        ]);

        $this->getComposerCommand()->requires('nesbot/carbon');
        $this->assertPackageRegistered('nesbot/carbon');
        $this->assertPackageInstalled('nesbot/carbon');
    }
}
