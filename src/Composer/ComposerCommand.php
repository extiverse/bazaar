<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

class ComposerCommand
{
    protected $application;

    public function __construct()
    {
        // TODO: configure Composer cache path ?
        // putenv('COMPOSER_HOME=' . __DIR__ . '/../vendor/bin/composer');

        $this->application = new Application();
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
