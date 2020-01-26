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
     * @return Webhook
     */
    public function handle(UpdateWebhook $command)
    {
        $actor = $command->actor;
        $data = $command->data;

        $this->assertAdmin($actor);

        $webhook = Webhook::where('id', $command->webhookId)->first();

        $service = array_get($data, 'attributes.service');
        $url = array_get($data, 'attributes.url');
        $events = array_get($data, 'attributes.events');
        $groupId = array_get($data, 'attributes.group_id');

        if (isset($service)) {
            $webhook->service = $service;
        }
        if (isset($url)) {
            $webhook->url = $url;
            $webhook->error = null;
        }
        if (isset($events)) {
            $webhook->events = json_encode($events);
        }
        if (isset($groupId)) {
            $webhook->group_id = $groupId;
        }

        $this->validator->assertValid($webhook->getDirty());

        $webhook->save();

        return $webhook;
    }
}
