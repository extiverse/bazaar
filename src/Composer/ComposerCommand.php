<?php

namespace Flagrow\Bazaar\Composer;

use Composer\Console\Application as ComposerApplication;
use Flarum\Foundation\Application;
use Symfony\Component\Console\ConsoleEvents;
use Symfony\Component\Console\Event\ConsoleExceptionEvent;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\EventDispatcher\EventDispatcher;

class ComposerCommand
{
    /**
     * @var EventDispatcher
     */
    protected $dispatcher;

    /**
     * @var ComposerApplication
     */
    protected $application;

    /**
     * @var Exception
     */
    protected $runtimeException = null;

    public function __construct(Application $app)
    {
        // Configure a default composer path if it isn't set on the system
        if (getenv('COMPOSER_HOME') === false) {
            // TODO: use app basePath() ?
            putenv('COMPOSER_HOME=' . $app->storagePath().'/composer');
        }

        $this->application = new ComposerApplication();
        $this->application->setAutoExit(false);

        $this->dispatcher = new EventDispatcher();
        $this->application->setDispatcher($this->dispatcher);
        $this->configureDispatcher();
    }

    protected function configureDispatcher()
    {
        $this->dispatcher->addListener(ConsoleEvents::EXCEPTION, function(ConsoleExceptionEvent $event) {
            // Throw Console Application exceptions into the Flarum Application so it can be catched
            // Exceptions thrown from this function are never catched by Flarum error handler,
            // but as this function runs along the `run` method we can save the output and read it after the `run`
            $this->runtimeException = $event->getException();
        });
    }

    public function run(array $commands)
    {
        $input = new ArrayInput($commands);
        $output = new BufferedOutput;
        $returnCode = $this->application->run($input, $output);

        if (!is_null($this->runtimeException)) {
            throw $this->runtimeException;
        }

        return $output->fetch();
    }

    public function update()
    {
        return $this->run([
            'command' => 'update',
        ]);
    }
}
