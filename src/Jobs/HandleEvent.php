<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Jobs;

use FoF\Webhooks\Action;
use FoF\Webhooks\Adapters;
use FoF\Webhooks\Listener\TriggerListener;
use FoF\Webhooks\Models\Webhook;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use JsonException;
use ReflectionException;
use RuntimeException;

class HandleEvent implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    public function __construct(protected $name, protected $event)
    {
    }

    /**
     * @throws ReflectionException
     * @throws JsonException
     */
    public function handle(): void
    {
        $clazz = Arr::get(TriggerListener::$listeners, $this->name);

        if (!isset($clazz)) {
            throw new RuntimeException("FoF Webhooks expected a listener registered for event {$this->name}");
        }

        /** @var Action $action */
        $action = resolve($clazz);

        TriggerListener::debug("{$this->name}: handling with $clazz");

        $this->send($this->name, $action);
    }

    /**
     * @param string $event_name
     * @param Action $action
     *
     * @throws ReflectionException
     * @throws JsonException
     */
    private function send(string $event_name, Action $action): void
    {
        $webhooks = Webhook::query()
            ->whereJsonContains('events', $event_name)
            ->get();

        foreach ($webhooks as $webhook) {
            /**
             * @var Webhook $webhook
             */
            if ($webhook->events === null || !in_array($event_name, $webhook->getEvents(), true)) {
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

                $adapter = Adapters\Adapters::get($webhook->service);

                if (!isset($adapter)) {
                    TriggerListener::debug("{$this->name}: webhook $webhook->id --> unknown adapter {$webhook->service}");
                    continue;
                }

                $adapter->handle($webhook, $response->withWebhook($webhook));
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
        $this->event = \Opis\Closure\unserialize(Arr::get($values, 'event'), null);
    }
}
