<?php

/**
 *  This file is part of reflar/webhooks
 *
 *  Copyright (c) ReFlar.
 *
 *  https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\Webhooks\Api\Serializers\WebhookSerializer;
use Reflar\Webhooks\Models\Webhook;
use Tobscure\JsonApi\Document;

class ListWebhooksController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = WebhookSerializer::class;

    /**
     * @param ServerRequestInterface $request
     * @param Document $document
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        return Webhook::all();
    }
}
