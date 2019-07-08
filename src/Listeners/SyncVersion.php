<?php

namespace Extiverse\Bazaar\Listeners;

use Extiverse\Bazaar\Events\ExtensionWasInstalled;
use Extiverse\Bazaar\Events\ExtensionWasUpdated;
use Extiverse\Bazaar\Jobs\SyncVersion as Job;
use Flarum\Extension\Event\Uninstalled;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher as Bus;
use Illuminate\Contracts\Events\Dispatcher;

class SyncVersion
{
    /**
     * @var Bus
     */
    private $bus;
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    public function __construct(Bus $bus, SettingsRepositoryInterface $settings)
    {
        $this->bus = $bus;
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen([
            ExtensionWasInstalled::class,
            ExtensionWasUpdated::class,
            Uninstalled::class,
        ], [$this, 'sync']);
    }

    /**
     * @param $event
     */
    public function sync($event)
    {
        if ($this->settings->get('flagrow.bazaar.sync') !== '0') {
            $version = $event->extension->getVersion();

            if ($event instanceof Uninstalled) {
                $version = null;
            }

            if ($event instanceof ExtensionWasUpdated) {
                $version = '-unknown-';
            }

            $this->bus->dispatch(new Job($event->extension, $version));
        }
    }
}
