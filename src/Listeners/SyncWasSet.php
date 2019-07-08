<?php

namespace Extiverse\Bazaar\Listeners;

use Extiverse\Bazaar\Search\FlagrowApi;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Hashing\Hasher;

class SyncWasSet
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
        $events->listen(Saved::class, [$this, 'notifyRemote']);
    }

    public function notifyRemote(Saved $event)
    {
        if ($event->settings['flagrow.bazaar.sync'] ?? false) {
            $response = $this->api->post('bazaar/sync-configured', [
                'json' => [
                    'sync' => $event->settings['flagrow.bazaar.sync']
                ]
            ]);

            $code = $response->getStatusCode();

            if ($code === 200) {
                $this->settings->set(
                    'flagrow.bazaar.sync.hash',
                    $this->hasher->make((string) $response->getBody())
                );
            }

            if ($code === 204) {
                $this->settings->delete(
                    'flagrow.bazaar.sync.hash'
                );
            }
        }
    }
}
