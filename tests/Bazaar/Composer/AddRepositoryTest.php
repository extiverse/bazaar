<?php

namespace Tests\Bazaar\Composer;

use Flagrow\Bazaar\Composer\Utils\ComposerFileEditor;

class AddRepositoryTest extends BaseCommandTest
{

    /**
     * @test
     */
    public function adds_repositories()
    {
        $this->setComposerJson([
            'name' => 'flagrow/test',
            'type' => 'project',
        ]);

        $editor = new ComposerFileEditor($this->composerEnv->getComposerJsonPath());

        $editor->addRepository('composer', 'https://flagrow.io/satis', [
            'http' => [
                'header' => [
                    'Authorization' => 'Bearer foo'
                ]
            ]
        ]);
        $editor->saveToFile();

        $this->assertRepositoryRegistered('composer', 'https://flagrow.io/satis');
    }
}
