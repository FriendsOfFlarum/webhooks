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

namespace Reflar\Webhooks\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\User\Exception\PermissionDeniedException;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\Webhooks\Api\Serializer\WebhookSerializer;
use Reflar\Webhooks\Models\Webhook;
use Tobscure\JsonApi\Document;

class ListWebhooksController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = WebhookSerializer::class;

    /**
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @throws PermissionDeniedException
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');

        if (!$actor->isAdmin()) {
            throw new PermissionDeniedException();
        }

        return Webhook::all();
    }
}
