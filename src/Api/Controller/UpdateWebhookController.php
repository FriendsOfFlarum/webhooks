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

use Flarum\Api\Controller\AbstractCreateController;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Reflar\Webhooks\Api\Serializer\WebhookSerializer;
use Reflar\Webhooks\Command\UpdateWebhook;
use Tobscure\JsonApi\Document;

class UpdateWebhookController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = WebhookSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = array_get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $data = array_get($request->getParsedBody(), 'data', []);

        return $this->bus->dispatch(
            new UpdateWebhook($id, $actor, $data)
        );
    }
}
