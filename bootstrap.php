<?php

namespace Flagrow\Bazaar;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddApiControllers::class);

    $app->register(Providers\ComposerProvider::class);
    $app->register(Providers\ExtensionProvider::class);
};
