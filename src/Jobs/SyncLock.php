<?php

namespace Flagrow\Bazaar\Jobs;

use Carbon\Carbon;
use Flagrow\Bazaar\Models\Task;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class SyncLock implements SelfHandling
{
    /**
     * @var FlagrowApi
     */
    private $api;
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    public function __construct()
    {
    }

    public function handle(FlagrowApi $api, SettingsRepositoryInterface $settings)
    {
        $lockPath = base_path('composer.lock');

        $task = Task::build(__CLASS_);
        $task->started_at = Carbon::now();
        $task->save();

        $api->postAsync('bazaar/sync-lock', [
            'multipart' => [
                [
                    'name' => 'lock',
                    'contents' => fopen($lockPath, 'r')
                ]
            ]
        ])->then(function ($payload) use ($task, $settings) {

            $task->output = $payload;
            $task->finished_at = Carbon::now();
            $task->save();

            $this->settings->set('flagrow.bazaar.last_lock.sync', (string)(new Carbon));
        });
    }
}