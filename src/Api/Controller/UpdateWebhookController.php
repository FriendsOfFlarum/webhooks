<?php

namespace BeB\Webhooks\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use BeB\Webhooks\Api\Serializer\WebhookSerializer;
use BeB\Webhooks\Command\UpdateWebhook;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
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
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = $request->getAttribute('actor');
        $data = Arr::get($request->getParsedBody(), 'data', []);

        return $this->bus->dispatch(
            new UpdateWebhook($id, $actor, $data)
        );
    }
}
