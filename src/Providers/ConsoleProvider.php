<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Console\TaskCommand;
use Flagrow\Console\Events\ConfigureConsoleApplication;
use Flagrow\Console\Providers\ConsoleProvider as Console;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Contracts\Events\Dispatcher as Events;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        /** @var ExtensionManager $manager */
        $manager = $this->app->make(ExtensionManager::class);

        if ($manager->getExtension('flagrow-console') === null) {
            return;
        }

        $this->app->register(Console::class);

        $this->app->make(Events::class)
            ->listen(ConfigureConsoleApplication::class, [$this, 'addCommands']);
    }

    public function addCommands(ConfigureConsoleApplication $event)
    {
        if (!$event->app->isInstalled()) {
            return;
        }

        $event->console->add(
            $this->app->make(TaskCommand::class)
        );

        /** @var Schedule $schedule */
        $schedule = $this->app->make(Schedule::class);

        $schedule->command('bazaar:task')
            ->everyMinute()
            ->withoutOverlapping();
    }
}
