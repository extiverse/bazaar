<?php

namespace Extiverse\Bazaar\Jobs;

use Extiverse\Bazaar\Composer\ComposerCommand;
use Extiverse\Bazaar\Models\Task;

class RemovePackage extends ComposerJob
{
    /**
     * @inheritdoc
     */
    public function handleComposer(ComposerCommand $command, Task $task)
    {
        return $command->remove($task->package);
    }
}
