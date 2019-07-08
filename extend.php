<?php

namespace Extiverse\Bazaar;

use Extiverse\Bazaar\Api\Controllers;
use Flarum\Extend\Frontend;
use Flarum\Extend\Locale;
use Flarum\Extend\Locales;
use Flarum\Extend\Routes;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Routes('api'))
        ->get('/bazaar-extensions', 'bazaar.extensions.index', Controllers\ListExtensionController::class)
        ->post('/bazaar-extensions', 'bazaar.extensions.install', Controllers\InstallExtensionController::class)
        ->patch('/bazaar-extensions/{id}', 'bazaar.extensions.update', Controllers\UpdateExtensionController::class)
        ->patch('/bazaar-extensions/{id}/toggle', 'bazaar.extensions.toggle', Controllers\ToggleExtensionController::class)
        ->post('/bazaar-extensions/{id}/favorite', 'bazaar.extensions.favorite', Controllers\FavoriteExtensionController::class)
        ->delete('/bazaar-extensions/{id}', 'bazaar.extensions.delete', Controllers\UninstallExtensionController::class)
        ->get('/bazaar/redirect/subscribe/{id}', 'bazaar.redirect.subscribe', Controllers\SubscriptionRedirectSubscribeController::class)
        ->get('/bazaar/redirect/unsubscribe/{id}', 'bazaar.redirect.unsubscribe', Controllers\SubscriptionRedirectUnsubscribeController::class)
        ->get('/bazaar/callback/subscription', 'bazaar.callback.subscription', Controllers\SubscriptionRedirectCallbackController::class)
        ->get('/bazaar/connect', 'bazaar.connect', Controllers\ConnectController::class)
        ->get('/bazaar/tasks', 'bazaar.tasks.index', Controllers\ListTaskController::class)
        ->get('/bazaar/sync/composer-lock', 'bazaar.composer-lock', Controllers\RetrieveComposerLockController::class)
        ->get('/bazaar/sync/extensions/{id}/version', 'bazaar.extensions.version', Controllers\RetrieveExtensionVersionController::class),
    (new Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),
    new Locales(__DIR__ . '/resources/locale'),
    function (Application $app) {
        /** @var Dispatcher $events */
        $events = $app['events'];

        $events->subscribe(Listeners\BazaarEnabled::class);
        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->subscribe(Listeners\AddSatisConfiguration::class);
        $events->subscribe(Listeners\SyncWasSet::class);
        $events->subscribe(Listeners\SyncVersion::class);
        $events->subscribe(Listeners\RegisterConsoleCommand::class);
        $events->subscribe(Listeners\SearchForInstalledExtensions::class);

        $app->register(Providers\ComposerEnvironmentProvider::class);
        $app->register(Providers\ExtensionProvider::class);
        $app->register(Providers\ConsoleProvider::class);
    }
];
