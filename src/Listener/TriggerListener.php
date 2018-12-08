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
     * @var ArrayObject<String, String>
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
     * @param $name
     * @param $data
     *
     * @throws \ReflectionException
     */
    public function run($name, $data)
    {
        $event = array_get($data, 0);

        if (!isset($event) || !array_key_exists($name, self::$listeners)) {
            return;
        }

        /**
         * @var Action
         */
        $clazz = self::$listeners[$name];
        $action = (new \ReflectionClass($clazz))->newInstance();

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
        self::addListener(Actions\Discussion\Deleted::class);
        self::addListener(Actions\Discussion\Hidden::class);
        self::addListener(Actions\Discussion\Renamed::class);
        self::addListener(Actions\Discussion\Restored::class);
        self::addListener(Actions\Discussion\Started::class);

        self::addListener(Actions\Group\Created::class);
        self::addListener(Actions\Group\Renamed::class);
        self::addListener(Actions\Group\Deleted::class);

        self::addListener(Actions\Post\Posted::class);
        self::addListener(Actions\Post\Revised::class);
        self::addListener(Actions\Post\Hidden::class);
        self::addListener(Actions\Post\Restored::class);
        self::addListener(Actions\Post\Deleted::class);

        self::addListener(Actions\User\Renamed::class);
        self::addListener(Actions\User\Registered::class);
        self::addListener(Actions\User\Deleted::class);
    }

    public static function addListener(string $action)
    {
        $clazz = @constant("$action::EVENT");

        if (isset($clazz) && class_exists($clazz)) {
            self::$listeners[$clazz] = $action;
        } elseif (!isset($clazz)) {
            echo "$action::EVENT does not exist";
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
