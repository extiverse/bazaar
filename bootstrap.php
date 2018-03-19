<?php

namespace Flagrow\Bazaar;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddApiAttributes::class);
    $events->subscribe(Listeners\AddApiControllers::class);
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddSatisConfiguration::class);
    $events->subscribe(Listeners\BazaarEnabled::class);
    $events->subscribe(Listeners\RegisterConsoleCommand::class);
    $events->subscribe(Listeners\SearchForInstalledExtensions::class);
    $events->subscribe(Listeners\SyncWasSet::class);
    $events->subscribe(Listeners\SyncVersion::class);

    $app->register(Providers\ComposerEnvironmentProvider::class);
    $app->register(Providers\ExtensionProvider::class);
};
