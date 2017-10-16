<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
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
