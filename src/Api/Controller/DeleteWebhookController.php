<?php

namespace BeB\Webhooks\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use BeB\Webhooks\Command\DeleteWebhook;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteWebhookController extends AbstractDeleteController
{
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
     */
    protected function delete(ServerRequestInterface $request)
    {
        $this->bus->dispatch(
            new DeleteWebhook(Arr::get($request->getQueryParams(), 'id'), $request->getAttribute('actor'))
        );
    }
}
