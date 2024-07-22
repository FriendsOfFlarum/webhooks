<?php

namespace BeB\Webhooks\Command;

use Flarum\User\Exception\PermissionDeniedException;
use BeB\Webhooks\Models\Webhook;

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
