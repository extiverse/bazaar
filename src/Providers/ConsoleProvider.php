<?php

namespace Extiverse\Bazaar\Providers;

use FoF\Console\Providers\ConsoleProvider as Console;
use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        if (!defined('ARTISAN_BINARY')) {
            define('ARTISAN_BINARY', 'flarum');
        }

        // Force registering the Schedule as singleton.
        $this->app->register(Console::class);

        $this->app->resolving(Schedule::class, function (Schedule $schedule) {
            $schedule->command('bazaar:task')
                ->everyMinute()
                ->withoutOverlapping()
                ->appendOutputTo(storage_path('logs/bazaar-tasks.log'));
        });
    }
}
