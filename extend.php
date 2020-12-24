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

namespace Reflar\Webhooks;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Frontend\Document;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\Webhooks\Adapters\Adapters;
use Reflar\Webhooks\Api\Serializer\WebhookSerializer;
use Reflar\Webhooks\Listener\TriggerListener;
use Reflar\Webhooks\Models\Webhook;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less')
        ->content(function (Document $document) {
            $document->payload['reflar-webhooks.services'] = array_keys(Adapters::all());
            $document->payload['reflar-webhooks.events'] = array_keys(TriggerListener::$listeners);
        }),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/reflar/webhooks', 'reflar.webhooks.index', Api\Controller\ListWebhooksController::class)
        ->post('/reflar/webhooks', 'reflar.webhooks.create', Api\Controller\CreateWebhookController::class)
        ->patch('/reflar/webhooks/{id}', 'reflar.webhooks.update', Api\Controller\UpdateWebhookController::class)
        ->delete('/reflar/webhooks/{id}', 'reflar.webhooks.delete', Api\Controller\DeleteWebhookController::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('webhooks', WebhookSerializer::class),

    (new Extend\ApiController(ShowForumController::class))
        ->addInclude('webhooks')
        ->prepareDataForSerialization(function (ShowForumController $controller, &$data, ServerRequestInterface $request) {
            $actor = $request->getAttribute('actor');

            $data['webhooks'] = $actor->isAdmin() ? Webhook::all() : [];
        }),

    function (Dispatcher $dispatcher) {
        $dispatcher->subscribe(Listener\TriggerListener::class);
    },
];
