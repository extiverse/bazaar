<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Api\Controllers\UpdateExtensionController;
use Flagrow\Bazaar\Api\Controllers\UninstallExtensionController;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Events\Dispatcher;

class AddApiControllers
{
    /**
     * Subscribes to the Flarum api routes configuration event.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    /**
     * Registers our routes.
     *
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        // Install / update an extension
        $event->get(
            '/bazaar/extensions/{name}',
            'bazaar.extensions.update',
            UpdateExtensionController::class
        );

        // Uninstall an extension
        $event->delete(
            '/bazaar/extensions/{name}',
            'bazaar.extensions.delete',
            UninstallExtensionController::class
        );
    }
}
