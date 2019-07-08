<?php

namespace Extiverse\Bazaar\Console;

use Extiverse\Bazaar\Models\Task;
use Illuminate\Console\Command;

class TaskCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'bazaar:task {task? : A task id to process or blank to process the next unprocessed}';

    /**
     * @var string
     */
    protected $description = 'Fires a Bazaar task in the background, specify an Id to force that task to be retried.';

    public function handle()
    {
        $taskId = $this->argument('task');

        if ($taskId) {
            /** @var Task $task */
            $task = Task::findOrFail($taskId);
        } else {
            $task = Task::whereNull('started_at')
                ->whereNotNull('package')
                ->whereNotNull('command_class')
                ->whereNull('finished_at')
                ->orderBy('created_at')
                ->first();
        }

        if (!$task) {
            $this->info("No tasks found.");
            return;
        }

        $class = $task->command_class;

        if (class_exists($class)) {
            $this->info("Processing task {$task->id}, to {$task->command} {$task->package}");
            return call_user_func([$class, 'launchJob'], $task);
        }

        $this->error("Could not call launchJob for task $taskId");
    }
}
