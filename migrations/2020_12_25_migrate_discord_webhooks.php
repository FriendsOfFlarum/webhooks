<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use BeB\Webhooks\Models\Webhook;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        Webhook::query()
            ->where('service', 'discord')
            ->where('url', 'LIKE', '%discordapp.com/%')
            ->each(function (Webhook $hook) {
                $hook->url = str_replace('discordapp.com/', 'discord.com/', $hook->url);
                $hook->save();
            });
    },
    'down' => function (Builder $schema) {
        //
    },
];
