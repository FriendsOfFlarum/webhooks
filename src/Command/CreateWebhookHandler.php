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
use FoF\Webhooks\Validator\WebhookValidator;
use Illuminate\Support\Arr;

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
