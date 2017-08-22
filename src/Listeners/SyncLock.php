<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Events\ExtensionWasInstalled;
use Flagrow\Bazaar\Events\ExtensionWasUpdated;
use Flarum\Event\ExtensionWasUninstalled;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher as Bus;
use Illuminate\Contracts\Events\Dispatcher;
use Flagrow\Bazaar\Jobs\SyncLock as Job;

class SyncLock
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
            ExtensionWasUninstalled::class,
            ExtensionWasUpdated::class
        ], [$this, 'sync']);
    }

    /**
     * @param $event
     */
    public function sync($event)
    {
        dd($this->settings->get('flagrow-bazaar.flagrow.bazaar.sync'));
        if ($this->settings->get('flagrow-bazaar.flagrow.bazaar.sync') == 1) {
            $this->bus->dispatch(new Job);
        }
    }
}