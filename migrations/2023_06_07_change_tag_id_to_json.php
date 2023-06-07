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
    'up' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->json('tag_id')->change();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->unsignedInteger('tag_id')->change();
        });
    },
];
