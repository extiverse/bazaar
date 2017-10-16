<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Console\TaskCommand;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        /** @var ExtensionManager $manager */
        $manager = $this->app->make(ExtensionManager::class);
        if (!$manager->getExtension('flagrow-chronos')) {
            return;
        }

        /** @var Schedule $schedule */
        $schedule = $this->app->make(Schedule::class);

        $schedule->command(TaskCommand::class)
            ->everyMinute()
            ->withoutOverlapping();
    }
}
