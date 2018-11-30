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

namespace Reflar\Webhooks\Command;

use Flarum\User\AssertPermissionTrait;
use Flarum\User\Exception\PermissionDeniedException;
use Reflar\Webhooks\Models\Webhook;

class DeleteWebhookHandler
{
    use AssertPermissionTrait;

    /**
     * @param DeleteWebhook $command
     *
     * @throws PermissionDeniedException
     *
     * @return void
     */
    public function handle(DeleteWebhook $command)
    {
        $actor = $command->actor;

        $this->assertAdmin($actor);

        Webhook::where('id', $command->webhookId)->first()->delete();
    }
}
