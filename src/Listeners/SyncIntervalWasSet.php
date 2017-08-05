<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Core\User;
use Flarum\Event\SettingWasSet;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Hashing\Hasher;

class SyncIntervalWasSet
{
    /**
     * @var FlagrowApi
     */
    private $api;
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;
    /**
     * @var Hasher
     */
    private $hasher;

    public function __construct(FlagrowApi $api, SettingsRepositoryInterface $settings, Hasher $hasher)
    {
        $this->api = $api;
        $this->settings = $settings;
        $this->hasher = $hasher;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(SettingWasSet::class, [$this, 'notifyRemote']);
    }

    public function notifyRemote(SettingWasSet $event)
    {
        if ($event->key === 'flagrow.bazaar.sync_interval') {
            $response = $this->api->post('bazaar/sync-interval', [
                'json' => [
                    'interval' => $event->value
                ]
            ]);

            if ($response->getStatusCode() === 200) {
                $this->settings->set(
                    'flagrow.bazaar.sync.hash',
                    $this->hasher->make((string) $response->getBody())
                );
            }
        }
    }
}