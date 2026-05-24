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

// Fixes the tag_id column to ensure it remains nullable after the JSON conversion.
// Looks like some DB backends allow NULL (e.g. MySQL 8.4.2) on JSON fields while other's don't unless explicitly set.
return [
    'up' => static function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) {
            $table->json('tag_id')->nullable()->change();
        });
    },
    'down' => static function (Builder $schema) {
        // noop
    },
];

