<?php

namespace BeB\Webhooks\Command;

use Flarum\User\Exception\PermissionDeniedException;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Validator\WebhookValidator;
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
