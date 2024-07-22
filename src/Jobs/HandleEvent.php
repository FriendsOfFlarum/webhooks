<?php

namespace BeB\Webhooks\Jobs;

use BeB\Webhooks\Action;
use BeB\Webhooks\Adapters;
use BeB\Webhooks\Listener\TriggerListener;
use BeB\Webhooks\Models\Webhook;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use ReflectionClass;

class HandleEvent implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    protected $name;
    protected $event;

    public function __construct($name, $event)
    {
        $this->name = $name;
        $this->event = $event;
    }

    public function handle()
    {
        $clazz = TriggerListener::$listeners[$this->name];
        /** @var Action $action */
        $action = (new ReflectionClass($clazz))->newInstance();

        TriggerListener::debug("{$this->name}: handling with $clazz");

        $this->send($this->name, $action);
    }

    /**
     * @param string $event_name
     * @param Action $action
     *
     * @throws \ReflectionException
     */
    private function send(string $event_name, Action $action)
    {
        foreach (Webhook::all() as $webhook) {
            if ($webhook->events != null && !in_array($event_name, $webhook->getEvents())) {
                TriggerListener::debug("{$this->name}: webhook $webhook->id --> not subscribed");
                continue;
            }

            if (!$webhook->isValid() || $action->ignore($webhook, $this->event)) {
                TriggerListener::debug("{$this->name}: webhook $webhook->id --> invalid URL / ignored event");
                continue;
            }

            $response = $action->handle($webhook, $this->event);

            if (isset($response)) {
                TriggerListener::debug("{$this->name}: webhook $webhook->id --> sending response");

                Adapters\Adapters::get($webhook->service)->handle($webhook, $response->withWebhook($webhook));
            } else {
                TriggerListener::debug("{$this->name}: webhook $webhook->id --> no response");
            }
        }
    }

    public function __serialize(): array
    {
        return [
            'name'  => $this->name,
            'event' => \Opis\Closure\serialize($this->event),
        ];
    }

    public function __unserialize(array $values): void
    {
        $this->name = Arr::get($values, 'name');
        $this->event = \Opis\Closure\unserialize(Arr::get($values, 'event'));
    }
}
