<?php

namespace Extiverse\Bazaar\Jobs;

use Carbon\Carbon;
use Extiverse\Bazaar\Extensions\ExtensionUtils;
use Flarum\Extension\Extension;
use Extiverse\Bazaar\Models\Task;
use Extiverse\Bazaar\Search\FlagrowApi;

class SyncVersion
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

        $url = sprintf(
            'bazaar/sync-version/%s/%s',
            ExtensionUtils::packageToId($this->extension->name),
            $this->version
        );

        $api->postAsync($url)->then(function () use ($task) {
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
        $task = Task::build('sync-version', $this->extension->name);
        $task->status = 'working';
        $task->started_at = Carbon::now();
        $task->save();
        return $task;
    }
}
