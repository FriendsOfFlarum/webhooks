<?php

namespace Reflar\Webhooks\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Reflar\Webhooks\Adapters;
use Reflar\Webhooks\Listener\TriggerListener;
use Reflar\Webhooks\Models\Webhook;
use Reflar\Webhooks\Response;
use ReflectionClass;

class HandleEvent implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $name;
    protected $event;

    public function __construct($name, $event)
    {
        $this->name = $name;
        $this->event = $event;
    }

    public function handle() {
        $clazz = TriggerListener::$listeners[$this->name];
        $action = (new ReflectionClass($clazz))->newInstance();

        if ($action->ignore($this->event)) {
            return;
        }

        /**
         * @var Response
         */
        $response = $action->listen($this->event);

        if (isset($response)) {
            $this->send($this->name, $response);
        }
    }

    /**
     * @param string   $event_name
     * @param Response $response
     *
     * @throws \ReflectionException
     */
    private function send(string $event_name, Response $response)
    {
        if (!$response) {
            return;
        }

        foreach (Webhook::all() as $webhook) {
            if ($webhook->events != null && !in_array($event_name, $webhook->getEvents())) {
                continue;
            }

            if ($webhook->isValid()) {
                Adapters\Adapters::get($webhook->service)->handle($webhook, $response);
            }
        }
    }
}
