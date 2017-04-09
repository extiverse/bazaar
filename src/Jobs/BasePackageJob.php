<?php

namespace Flagrow\Bazaar\Jobs;

use Carbon\Carbon;
use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerEnvironment;
use Flagrow\Bazaar\Composer\ComposerOutput;
use Flagrow\Bazaar\Task;
//use Illuminate\Bus\Queueable;
//use Illuminate\Queue\SerializesModels;
//use Illuminate\Queue\InteractsWithQueue;
//use Illuminate\Contracts\Queue\ShouldQueue;
use Psr\Log\LoggerInterface;

abstract class BasePackageJob /*implements ShouldQueue*/
{
    //use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Task
     */
    protected $task;

    /**
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * @param ComposerEnvironment $env
     * @param LoggerInterface $log
     */
    public function handle(ComposerEnvironment $env, LoggerInterface $log)
    {
        $command = new ComposerCommand($env);

        $this->task->status = 'working';
        $this->task->started_at = Carbon::now();
        $this->task->save();

        try {
            $output = $this->handleComposer($command, $this->task);

            $this->task->status = 'success';
            $this->task->output = $output->getOutput();
        } catch (\Exception $e) {
            $this->task->status = 'exception';
            $this->task->output = $e->getMessage();
            $log->error($e->getMessage());
        }

        $this->task->finished_at = Carbon::now();
        $this->task->save();
    }

    /**
     * @param ComposerCommand $command
     * @param Task $task
     * @return ComposerOutput
     */
    abstract protected function handleComposer(ComposerCommand $command, Task $task);

    /**
     * Workaround to easily launch jobs until Flarum support them
     * @param Task $task
     */
    public static function launchJob(Task $task)
    {
        $job = new static($task);
        $env = app()->make(ComposerEnvironment::class);
        $log = app()->make(LoggerInterface::class);
        $job->handle($env, $log);
    }
}
