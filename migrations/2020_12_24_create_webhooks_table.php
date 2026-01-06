<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;
use Flarum\Group\Group;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTableIfNotExists('webhooks', static function (Blueprint $table) {
    $table->increments('id');
    $table->string('service');
    $table->string('url');
    $table->string('error')->nullable();
    $table->binary('events');

    $table->integer('group_id')->unsigned()->default(Group::GUEST_ID);
});
