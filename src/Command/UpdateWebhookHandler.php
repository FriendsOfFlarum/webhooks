<?php

/**
 *  This file is part of reflar/webhooks
 *
 *  Copyright (c) ReFlar.
 *
 *  http://reflar.io
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Command;

use Flarum\User\AssertPermissionTrait;
use Flarum\User\Exception\PermissionDeniedException;
use Reflar\Webhooks\Models\Webhook;
use Reflar\Webhooks\Validator\WebhookValidator;

class UpdateWebhookHandler
{
    use AssertPermissionTrait;

    /**
     * @var WebhookValidator
     */
    protected $validator;

    /**
     * @param WebhookValidator $validator
     */
    public function __construct(WebhookValidator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * @param UpdateWebhook $command
     *
     * @throws PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return void
     */
    public function handle(UpdateWebhook $command)
    {
        $actor = $command->actor;
        $data = $command->data;

        $this->assertAdmin($actor);

        $webhook = Webhook::where('id', $command->webhookId)->first();

        if (isset($data['service'])) {
            $webhook->service = $data['service'];
        }

        if (isset($data['url'])) {
            $webhook->url = $data['url'];
        }

        $this->validator->assertValid($webhook->getDirty());

        $webhook->save();

        return;
    }
}
