<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {

        if ($schema->getConnection()->getSchemaBuilder()->getColumnType('bazaar_tasks', 'output') === 'mediumText') {
            return;
        }

        $schema->table('bazaar_tasks', function (Blueprint $table) {
            $table->mediumText('output')->change();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('bazaar_tasks', function (Blueprint $table) {
            $table->text('output')->change();
        });
    }
];
