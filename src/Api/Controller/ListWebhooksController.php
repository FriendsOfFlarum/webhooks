<?php

namespace BeB\Webhooks\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\User\Exception\PermissionDeniedException;
use BeB\Webhooks\Api\Serializer\WebhookSerializer;
use BeB\Webhooks\Models\Webhook;
use Psr\Http\Message\ServerRequestInterface;
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
     * @return \Illuminate\Database\Eloquent\Collection|Webhook[]
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
