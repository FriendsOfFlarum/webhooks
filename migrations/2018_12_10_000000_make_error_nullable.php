<?php

/*
 * This file is part of reflar/webhooks.
 *
 * Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->string('error')->nullable()->change();
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->string('error')->nullable(false)->change();
        });
    },
];
