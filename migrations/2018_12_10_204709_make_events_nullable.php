<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->binary('events')->nullable()->change();
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->binary('events')->nullable(false)->change();
        });
    }
];
