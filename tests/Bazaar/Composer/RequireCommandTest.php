<?php

namespace Tests\Bazaar\Composer;

class RequireCommandTest extends BaseCommandTest
{
    public function test_require_new_package()
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
