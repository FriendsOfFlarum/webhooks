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

namespace Reflar\Webhooks\Listener;

use ArrayObject;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\Webhooks\Action;
use Reflar\Webhooks\Actions;
use Reflar\Webhooks\Adapters;
use Reflar\Webhooks\Models\Webhook;
use Reflar\Webhooks\Response;

class TriggerListener
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var ArrayObject<String, Action>
     */
    public static $listeners = null;

    /**
     * EventListener constructor.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;

        if (self::$listeners == null) {
            self::setupDefaultListeners();
        }
    }

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen('*', [$this, 'run']);
    }

    /**
     * @param $event
     *
     * @throws \Exception
     */
    public function run($name, $data)
    {
        $event = array_get($data, 0);

        if (!isset($event)) {
            return;
        }
        if (!array_key_exists($name, self::$listeners)) {
            return;
        }

        /**
         * @var Action
         */
        $action = self::$listeners[$name];

        if ($action->ignore($event)) {
            return;
        }

        /**
         * @var Response
         */
        $response = $action->listen($event);

        if (isset($response)) {
            $this->handle($name, $response);
        }
    }

    public static function setupDefaultListeners()
    {
        self::addListener(new Actions\Discussion\Deleted());
        self::addListener(new Actions\Discussion\Hidden());
        self::addListener(new Actions\Discussion\Renamed());
        self::addListener(new Actions\Discussion\Restored());
        self::addListener(new Actions\Discussion\Started());

        self::addListener(new Actions\Group\Created());
        self::addListener(new Actions\Group\Renamed());
        self::addListener(new Actions\Group\Deleted());

        self::addListener(new Actions\Post\Posted());
        self::addListener(new Actions\Post\Revised());
        self::addListener(new Actions\Post\Hidden());
        self::addListener(new Actions\Post\Restored());
        self::addListener(new Actions\Post\Deleted());

        self::addListener(new Actions\User\Renamed());
        self::addListener(new Actions\User\Registered());
        self::addListener(new Actions\User\Deleted());
    }

    public static function addListener(Action $action)
    {
        $clazz = $action->getEvent();

        if (class_exists($clazz)) {
            self::$listeners[$clazz] = $action;
        }
    }

    /**
     * @param string   $event_name
     * @param Response $response
     *
     * @throws \ReflectionException
     */
    private function handle(string $event_name, Response $response)
    {
        if (!$response) {
            return;
        }

        if (Adapters\Adapters::length() == 0) {
            Adapters\Adapters::initialize();
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
