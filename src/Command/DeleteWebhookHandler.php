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

namespace FoF\Webhooks\Command;

use Flarum\User\Exception\PermissionDeniedException;
use FoF\Webhooks\Models\Webhook;

class DeleteWebhookHandler
{
    /**
     * @param DeleteWebhook $command
     *
     * @throws PermissionDeniedException
     *
     * @return void
     */
    public function handle(DeleteWebhook $command)
    {
        $command->actor->assertAdmin();

        Webhook::where('id', $command->webhookId)->first()->delete();
    }
}
