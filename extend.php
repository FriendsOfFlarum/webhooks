<?php

/**
 *  This file is part of reflar/webhooks.
 *
 *  Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\Webhooks\Api;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Routes('api'))
        ->get('/reflar/webhooks', 'reflar.webhooks.index', Api\Controller\ListWebhooksController::class)
        ->post('/reflar/webhooks', 'reflar.webhooks.create', Api\Controller\CreateWebhookController::class)
        ->patch('/reflar/webhooks/{id}', 'reflar.webhooks.update', Api\Controller\UpdateWebhookController::class)
        ->delete('/reflar/webhooks/{id}', 'reflar.webhooks.DELETE', Api\Controller\DeleteWebhookController::class),
    function (Dispatcher $dispatcher) {
        $dispatcher->subscribe(Listener\TriggerListener::class);
        $dispatcher->subscribe(Listener\AddRelationships::class);
    }
];
