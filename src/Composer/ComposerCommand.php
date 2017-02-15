<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Console\Application as ComposerApplication;
use Flarum\Foundation\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

class ComposerCommand
{
    protected $application;

    public function __construct(Application $app)
    {
        // Configure a default composer path if it isn't set on the system
        if (getenv('COMPOSER_HOME') === false) {
            // TODO: use app basePath() ?
            putenv('COMPOSER_HOME=' . $app->storagePath().'/composer');
        }

        $this->application = new ComposerApplication();
        $this->application->setAutoExit(false);
    }

    public function run(array $commands)
    {
        $input = new ArrayInput($commands);
        $output = new BufferedOutput;
        $returnCode = $this->application->run($input, $output);

        return $output->fetch();
    }

    public function update()
    {
        return $this->run([
            'command' => 'update',
        ]);
    }
}
