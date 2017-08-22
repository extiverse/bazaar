<?php

namespace Flagrow\Bazaar\Jobs;

use Carbon\Carbon;
use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Models\Task;
use Flagrow\Bazaar\Search\FlagrowApi;
use Illuminate\Contracts\Bus\SelfHandling;

class SyncVersion implements SelfHandling
{
    /**
     * @var Extension
     */
    private $extension;
    /**
     * @var string
     */
    private $version;

    public function __construct(Extension $extension, string $version = null)
    {
        $this->extension = $extension;
        $this->version = $version;
    }

    public function handle(FlagrowApi $api)
    {
        $task = $this->createTask();

        $api->postAsync('bazaar/sync-version', [
            'json' => [
                [
                    'name' => $this->extension->id,
                    'version' => $this->version
                ]
            ]
        ])->then(function () use ($task) {
            $task->finished_at = Carbon::now();
            $task->status = 'success';
            $task->save();
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
        $task = Task::build('sync-version');
        $task->status = 'working';
        $task->started_at = Carbon::now();
        $task->package = $this->extension->name;
        $task->save();
        return $task;
    }
}