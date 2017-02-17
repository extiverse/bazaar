<?php

namespace Tests\Bazaar\Composer;

use Flagrow\Bazaar\Composer\ComposerFileEditor;
use Tests\TestCase;

class ComposerFileEditorTest extends TestCase
{
    public function getSampleJson($name)
    {
        return file_get_contents(__DIR__.'/composer_'.$name.'.json');
    }

    public function test_add_new_package()
    {
        $editor = new ComposerFileEditor($this->getSampleJson('base'));

        $editor->addPackage('flagrow/bazaar', '^0.1.0');

        $this->assertEquals($this->getSampleJson('bazaar1'), $editor->getContents());
    }

    public function test_alter_existing_package()
    {
        $editor = new ComposerFileEditor($this->getSampleJson('bazaar1'));

        $editor->addPackage('flagrow/bazaar', '^0.2.0');

        $this->assertEquals($this->getSampleJson('bazaar2'), $editor->getContents());
    }

    public function test_remove_package()
    {
        $editor = new ComposerFileEditor($this->getSampleJson('bazaar1'));

        $editor->removePackage('flagrow/bazaar');

        $this->assertEquals($this->getSampleJson('base'), $editor->getContents());
    }
}
