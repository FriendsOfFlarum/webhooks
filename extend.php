<?php

namespace BeB\Webhooks;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Frontend\Document;
use BeB\Webhooks\Adapters\Adapters;
use BeB\Webhooks\Api\Serializer\WebhookSerializer;
use BeB\Webhooks\Listener\TriggerListener;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less')
        ->content(function (Document $document) {
            $document->payload['beb-webhooks.services'] = array_keys(Adapters::all());
            $document->payload['beb-webhooks.events'] = array_keys((array) TriggerListener::$listeners);
        }),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/beb/webhooks', 'beb.webhooks.index', Api\Controller\ListWebhooksController::class)
        ->post('/beb/webhooks', 'beb.webhooks.create', Api\Controller\CreateWebhookController::class)
        ->patch('/beb/webhooks/{id}', 'beb.webhooks.update', Api\Controller\UpdateWebhookController::class)
        ->delete('/beb/webhooks/{id}', 'beb.webhooks.delete', Api\Controller\DeleteWebhookController::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('webhooks', WebhookSerializer::class),

    (new Extend\Event())
        ->subscribe(Listener\TriggerListener::class),
];
