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

use Flarum\Extend;
use Flarum\Frontend\Document;
use FoF\Webhooks\Adapters\Adapters;
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

    (new Extend\ApiResource(Api\WebhookResource::class)),

    (new Extend\Event())
        ->subscribe(Listener\TriggerListener::class),
];
