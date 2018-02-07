<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Console\Providers\ConsoleProvider as Console;
use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        if (! $this->app->isInstalled()) {
            return;
        }

        // Force registering the Schedule as singleton.
        $this->app->register(Console::class);

        /** @var Schedule $schedule */
        $schedule = $this->app->make(Schedule::class);

        $schedule->command('bazaar:task')
            ->everyMinute()
            ->withoutOverlapping();
    }
}
