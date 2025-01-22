<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Command;

use Flarum\Tags\Tag;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Validator\WebhookValidator;
use Illuminate\Support\Arr;

class UpdateWebhookHandler
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
     * @param UpdateWebhook $command
     *
     * @throws PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return Webhook
     */
    public function handle(UpdateWebhook $command): Webhook
    {
        $actor = $command->actor;
        $data = $command->data;

        $actor->assertAdmin();

        /**
         * @var Webhook $webhook
         */
        $webhook = Webhook::findOrFail($command->webhookId);

        $service = Arr::get($data, 'attributes.service');
        $url = Arr::get($data, 'attributes.url');
        $events = Arr::get($data, 'attributes.events');
        $groupId = Arr::get($data, 'attributes.group_id');
        $usePlainText = Arr::get($data, 'attributes.use_plain_text');
        $includeTags = Arr::get($data, 'attributes.include_tags');
        $maxPostContentLength = Arr::get($data, 'attributes.max_post_content_length');
        $name = Arr::get($data, 'attributes.name');

        if (isset($service)) {
            $webhook->service = $service;
        }
        if (isset($url)) {
            $webhook->url = $url;
            $webhook->error = null;
        }
        if (isset($events)) {
            $webhook->events = is_array($events) ? json_encode($events) : $events;
        }
        if (isset($groupId)) {
            $webhook->group_id = $groupId;
        }

        if (Arr::has($data, 'attributes.extraText')) {
            $webhook->extra_text = trim(Arr::get($data, 'attributes.extraText'));
        }

        if (Arr::has($data, 'attributes.tag_id') && class_exists(Tag::class)) {
            $tagIds = Arr::get($data, 'attributes.tag_id');

            $webhook->tag_id = $tagIds;
        }

        if (isset($usePlainText)) {
            $webhook->use_plain_text = $usePlainText;
        }

        if (isset($includeTags)) {
            $webhook->include_tags = $includeTags;
        }

        if (isset($maxPostContentLength)) {
            $webhook->max_post_content_length = $maxPostContentLength == 0 ? null : $maxPostContentLength;
        }

        if (isset($name)) {
            $webhook->name = trim($name);
        }

        $this->validator->assertValid($webhook->getDirty());

        $webhook->save();

        return $webhook;
    }
}
