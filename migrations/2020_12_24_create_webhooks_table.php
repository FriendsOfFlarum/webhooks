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

use Flarum\Group\Group;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('webhooks')) {
            return;
        }

        $schema->create('webhooks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('service');
            $table->string('url');
            $table->string('error')->nullable();
            $table->binary('events');

            $table->string('extra_text', 256)->nullable();
            $table->integer('group_id')->unsigned()->default(Group::GUEST_ID);
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('webhooks');
    },
];
