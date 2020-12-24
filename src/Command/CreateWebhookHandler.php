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

use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Reflar\Webhooks\Models\Webhook;
use Reflar\Webhooks\Validator\WebhookValidator;

class CreateWebhookHandler
{
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
     * @param CreateWebhook $command
     *
     * @throws PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return Webhook
     */
    public function handle(CreateWebhook $command): Webhook
    {
        $actor = $command->actor;
        $data = $command->data;


        $actor->assertAdmin();

        $webhook = Webhook::build(
            Arr::get($data, 'attributes.service'),
            Arr::get($data, 'attributes.url')
        );

        $this->validator->assertValid($webhook->getAttributes());

        $webhook->save();

        return $webhook;
    }
}
