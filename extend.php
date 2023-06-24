<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Frontend\Document;
use FoF\Webhooks\Adapters\Adapters;
use FoF\Webhooks\Api\Serializer\WebhookSerializer;
use FoF\Webhooks\Listener\TriggerListener;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less')
        ->content(function (Document $document) {
            $document->payload['fof-webhooks.services'] = array_keys(Adapters::all());
            $document->payload['fof-webhooks.events'] = array_keys((array) TriggerListener::$listeners);
        }),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/fof/webhooks', 'fof.webhooks.index', Api\Controller\ListWebhooksController::class)
        ->post('/fof/webhooks', 'fof.webhooks.create', Api\Controller\CreateWebhookController::class)
        ->patch('/fof/webhooks/{id}', 'fof.webhooks.update', Api\Controller\UpdateWebhookController::class)
        ->delete('/fof/webhooks/{id}', 'fof.webhooks.delete', Api\Controller\DeleteWebhookController::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('webhooks', WebhookSerializer::class),

    (new Extend\Event())
        ->subscribe(Listener\TriggerListener::class),
];
