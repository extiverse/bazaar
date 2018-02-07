<?php

namespace Flagrow\Bazaar;

use DirectoryIterator;
use Flagrow\Bazaar\Api\Controllers;
use Flarum\Event\ConfigureLocales;
use Flarum\Extend\Assets;
use Flarum\Extend\Locale;
use Flarum\Extend\Routes;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Routes('api'))
        ->get('/bazaar/extensions', 'bazaar.extensions.index', Controllers\ListExtensionController::class)
        ->post('/bazaar/extensions', 'bazaar.extensions.install', Controllers\InstallExtensionController::class)
        ->patch('/bazaar/extensions/{id}', 'bazaar.extensions.update', Controllers\UpdateExtensionController::class)
        ->patch('/bazaar/extensions/{id}/toggle', 'bazaar.extensions.toggle', Controllers\ToggleExtensionController::class)
        ->post('/bazaar/extensions/{id}/favorite', 'bazaar.extensions.favorite', Controllers\FavoriteExtensionController::class)
        ->get('/bazaar/redirect/subscribe/{id}', 'bazaar.redirect.subscribe', Controllers\SubscriptionRedirectSubscribeController::class)
        ->get('/bazaar/redirect/unsubscribe/{id}', 'bazaar.redirect.unsubscribe', Controllers\SubscriptionRedirectUnsubscribeController::class)
        ->get('/bazaar/callback/subscription', 'bazaar.callback.subscription', Controllers\SubscriptionRedirectCallbackController::class)
        ->delete('/bazaar/extensions/{id}', 'bazaar.extensions.delete', Controllers\UninstallExtensionController::class)
        ->get('/bazaar/connect', 'bazaar.connect', Controllers\ConnectController::class)
        ->get('/bazaar/tasks', 'bazaar.tasks.index', Controllers\ListTaskController::class)
        ->get('/bazaar/sync/composer-lock', 'bazaar.composer-lock', Controllers\RetrieveComposerLockController::class)
        ->get('/bazaar/sync/extensions/{id}/version', 'bazaar.extensions.version', Controllers\RetrieveExtensionVersionController::class),
    (new Assets('admin'))
        ->asset(__DIR__ . '/resources/less/extension.less')
        ->asset(__DIR__ . '/js/admin/dist/extension.js')
        ->bootstrapper('flagrow/bazaar/main'),
//    (new Locale(__DIR__ . '/resources/locale')),
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

        // @todo Temporary solution until we can use an extender to add a locale yaml.
        $events->listen(ConfigureLocales::class, function (ConfigureLocales $event) {
            foreach (new DirectoryIterator(__DIR__ . '/resources/locale') as $file) {
                if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                    $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
                }
            }
        });

        $app->register(Providers\ComposerEnvironmentProvider::class);
        $app->register(Providers\ExtensionProvider::class);
        $app->register(Providers\ConsoleProvider::class);
    }
];
