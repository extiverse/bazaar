<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->getConnection()->getSchemaBuilder()->hasColumn('bazaar_tasks', 'command_class')) {
            return;
        }

        $schema->table('bazaar_tasks', function (Blueprint $table) {
            $table->string('command_class')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('bazaar_tasks', function (Blueprint $table) {
            $table->dropColumn('command_class');
        });
    }
];
