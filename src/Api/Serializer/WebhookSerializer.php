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

namespace Reflar\Webhooks\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use InvalidArgumentException;
use Reflar\Webhooks\Models\Webhook;

class WebhookSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'webhooks';

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($webhook)
    {
        if (!($webhook instanceof Webhook)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.Webhook::class
            );
        }

        return [
            'id'     => $webhook->id,
            'service'=> $webhook->service,
            'url'    => $webhook->url,
            'error'  => $webhook->error,
            'events' => $webhook->events,

            'is_valid' => $webhook->isValid(),
        ];
    }
}
