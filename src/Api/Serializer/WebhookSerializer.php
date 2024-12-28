<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoF\Webhooks\Models\Webhook;
use InvalidArgumentException;

class WebhookSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'webhooks';

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($webhook): array
    {
        if (!($webhook instanceof Webhook)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.Webhook::class
            );
        }

        return [
            'id'         => $webhook->id,
            'service'    => $webhook->service,
            'url'        => $webhook->url,
            'error'      => $webhook->error,
            'events'     => json_decode($webhook->events) ?: [],

            'group_id'   => $webhook->group_id,
            'tag_id'     => $webhook->tag_id,
            'extra_text' => $webhook->extra_text ?: '',
            'name'       => $webhook->name ?: '',

            'use_plain_text'          => (bool) $webhook->use_plain_text,
            'include_tags'            => (bool) $webhook->include_tags,
            'max_post_content_length' => ((int) $webhook->max_post_content_length) ?: null,

            'is_valid' => $webhook->isValid(),
        ];
    }
}
