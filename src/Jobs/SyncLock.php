<?php

namespace Flagrow\Bazaar\Jobs;

use Carbon\Carbon;
use Flagrow\Bazaar\Models\Task;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class SyncLock implements SelfHandling
{

    public function handle(FlagrowApi $api, SettingsRepositoryInterface $settings)
    {
        $lockPath = base_path('composer.lock');

        $task = Task::build('sync-lock');
        $task->status = 'working';
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

            $task->finished_at = Carbon::now();
            $task->status = 'success';
            $task->save();

            $settings->set('flagrow.bazaar.last_lock.sync', (string)(new Carbon));
        }, function ($payload) use ($task) {
            $task->finished_at = Carbon::now();
            $task->status = 'exception';
            $task->save();
        });
    }
}