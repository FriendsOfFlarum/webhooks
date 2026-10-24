<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => static function (Builder $schema) {
        $connection = $schema->getConnection();

        if ($connection->getDriverName() === 'pgsql') {
            $grammar = $connection->getQueryGrammar();
            $table = $grammar->wrapTable('webhooks');
            $column = $grammar->wrap('tag_id');

            $connection->statement(
                "ALTER TABLE $table ALTER COLUMN $column TYPE JSON USING to_json($column)"
            );

            return;
        }

        $schema->table('webhooks', function (Blueprint $table) {
            $table->json('tag_id')->nullable()->change();
        });
    },
    'down' => static function (Builder $schema) {
        $connection = $schema->getConnection();

        if ($connection->getDriverName() === 'pgsql') {
            $grammar = $connection->getQueryGrammar();
            $table = $grammar->wrapTable('webhooks');
            $column = $grammar->wrap('tag_id');

            $connection->statement(
                "ALTER TABLE $table ALTER COLUMN $column TYPE INTEGER USING (($column #>> '{}')::integer)"
            );

            return;
        }

        $schema->table('webhooks', function (Blueprint $table) {
            $table->unsignedInteger('tag_id')->nullable()->change();
        });
    },
];
