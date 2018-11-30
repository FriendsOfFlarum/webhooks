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

namespace Reflar\Webhooks\Listener;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Event\WillSerializeData;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\GetApiRelationship;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\Webhooks\Api\Serializer\WebhookSerializer;
use Reflar\Webhooks\Models\Webhook;

class AddRelationships
{
    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $events->listen(WillSerializeData::class, [$this, 'loadWebhooksRelationship']);
        $events->listen(WillGetData::class, [$this, 'includeWebhooks']);
    }

    /**
     * @param GetApiRelationship $event
     *
     * @return \Tobscure\JsonApi\Relationship
     */
    public function getApiAttributes(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'webhooks')) {
            return $event->serializer->hasMany($event->model, WebhookSerializer::class, 'webhooks');
        }
    }

    /**
     * @param WillSerializeData $event
     */
    public function loadWebhooksRelationship(WillSerializeData $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->data['webhooks'] = $event->actor->isAdmin() ? Webhook::all() : [];
        }
    }

    public function includeWebhooks(WillGetData $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->addInclude('webhooks');
        }
    }
}
