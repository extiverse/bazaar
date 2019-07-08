<?php

namespace Extiverse\Bazaar\Jobs;

use Extiverse\Bazaar\Composer\ComposerCommand;
use Extiverse\Bazaar\Models\Task;

class RequirePackage extends ComposerJob
{
    /**
     * @inheritdoc
     */
    public function handleComposer(ComposerCommand $command, Task $task)
    {
        return $command->requires($task->package);
    }
}
