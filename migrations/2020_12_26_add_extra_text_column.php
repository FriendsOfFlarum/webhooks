<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * https://friendsofflarum.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasColumn('webhooks', 'extra_text')) {
            return;
        }

        $schema->table('webhooks', function (Blueprint $table) {
            $table->string('extra_text', 256)->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->dropColumn('extra_text');
        });
    },
];
