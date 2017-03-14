<?php

namespace Tests\Bazaar\Composer;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerEnvironment;
use Illuminate\Filesystem\Filesystem;
use Tests\TestCase;

abstract class BaseCommandTest extends TestCase
{
    use AssertPackageInstallationTrait, AssertPackageRegistrationTrait;

    /**
     * @var FilesystemAdapter
     */
    protected $filesystem;

    /**
     * @var ComposerEnvironment
     */
    protected $composerEnv;

    /**
     * @inheritdoc
     */
    public function __construct()
    {
        parent::__construct();

        $this->filesystem = new Filesystem();
        $this->composerEnv = new ComposerEnvironment($this->getComposerWorkingDir(), $this->getComposerHomeDir(), $this->filesystem);
    }

    /**
     * @return string
     */
    public function getComposerWorkingDir()
    {
        return __DIR__.'/composer-tests';
    }

    /**
     * @return string
     */
    public function getComposerHomeDir()
    {
        return $this->getComposerWorkingDir().'/home';
    }

    /**
     * @return ComposerCommand
     */
    public function getComposerCommand()
    {
        return new ComposerCommand($this->composerEnv);
    }

    /**
     * @param array|\stdClass $data
     */
    public function setComposerJson($data)
    {
        $this->filesystem->put($this->getComposerWorkingDir().'/composer.json', json_encode($data, JSON_PRETTY_PRINT));
    }

    /**
     * @inheritdoc
     */
    public function setUp()
    {
        $this->filesystem->makeDirectory($this->getComposerWorkingDir());
    }

    public function tearDown()
    {
        $this->filesystem->deleteDirectory($this->getComposerWorkingDir());
    }
}
