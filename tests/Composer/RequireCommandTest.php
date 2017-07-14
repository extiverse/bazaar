<?php

namespace Flagrow\Bazaar\Tests\Composer;

use Flagrow\Bazaar\Tests\Satis\FakeServer;

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

    public function testRequireSatisPackage()
    {
        $satis = new FakeServer();
        $satis->start();

        try {
            $this->setComposerJson([
                'name' => 'flagrow/test',
                'type' => 'project',
                'require' => new \stdClass(),
                'repositories' => [
                    'flagrow' => [
                        'type' => 'composer',
                        'url' => $satis->getUrl(),
                    ]
                ],
                'config' => [
                    'secure-http' => false,
                ],
            ]);

            $this->getComposerCommand()->requires('flagrow/test-repo');
            $this->assertPackageRegistered('flagrow/test-repo');
            $this->assertPackageInstalled('flagrow/test-repo');
        } finally {
            $satis->kill();
        }
    }
}
