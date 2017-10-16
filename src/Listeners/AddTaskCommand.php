<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Console\TaskCommand;
use Flagrow\Chronos\Listeners\AddScheduleRunCommand;
use Flagrow\Console\Events\ConfigureConsoleApplication;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;

class AddTaskCommand
{
    protected $chronos;

    public function __construct(ExtensionManager $manager)
    {
        $this->chronos = $manager->getExtension('flagrow-chronos') !== null;
    }
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        if ($this->chronos) {
            // Force the schedule run command to be added.
            $events->subscribe(AddScheduleRunCommand::class);
            $events->listen(ConfigureConsoleApplication::class, [$this, 'add']);
        }
    }

    /**
     * @param ConfigureConsoleApplication $event
     */
    public function add(ConfigureConsoleApplication $event)
    {
        if ($event->app->isInstalled()) {
            $event->console->add($event->app->make(TaskCommand::class));
        }
    }
}
