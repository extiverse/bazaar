<?php

namespace Flagrow\Bazaar\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class TaskSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'bazaar-tasks';

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($task)
    {
        return [
            'status'      => $task->status,
            'command'     => $task->command,
            'package'     => $task->package,
            'output'      => $task->output,
            'created_at'  => $task->created_at,
            'started_at'  => $task->started_at,
            'finished_at' => $task->finished_at,
        ];
    }
}
