<?php

namespace Extiverse\Bazaar\Jobs;

use Carbon\Carbon;
use Extiverse\Bazaar\Models\Task;
use Extiverse\Bazaar\Search\FlagrowApi;
use Flarum\Settings\SettingsRepositoryInterface;

class SyncLock
{

    public function handle(FlagrowApi $api, SettingsRepositoryInterface $settings)
    {
        $lockPath = base_path('composer.lock');

        $task = $this->createTask();

        $api->postAsync('bazaar/sync-lock', [
            'multipart' => [
                [
                    'name' => 'lock',
                    'contents' => fopen($lockPath, 'r')
                ]
            ]
        ])->then(function () use ($task, $settings) {
            $task->finished_at = Carbon::now();
            $task->status = 'success';
            $task->save();

            $settings->set('flagrow.bazaar.sync.lock.at', (string)(new Carbon));
        }, function () use ($task) {
            $task->finished_at = Carbon::now();
            $task->status = 'exception';
            $task->save();
        });
    }

    /**
     * @return Task
     */
    protected function createTask()
    {
        $task = Task::build('sync-lock');
        $task->status = 'working';
        $task->started_at = Carbon::now();
        $task->save();
        return $task;
    }
}
