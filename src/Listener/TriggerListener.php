<?php

/**
 *  This file is part of reflar/webhooks.
 *
 *  Copyright (c) ReFlar.
 *
 *  https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Listener;

use ArrayObject;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Reflar\Webhooks\Action;
use Reflar\Webhooks\Adapters;
use Reflar\Webhooks\Actions;
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
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;

        if (self::$listeners == null) $this::setupDefaultListeners();
    }

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events) {
        foreach(self::$listeners as $key => $value) {
            $events->listen($key, [$this, 'run']);
        }
    }

    /**
     * @param $event
     * @throws \Exception
     */
    public function run($event) {
        if (is_string($event)) return;

        $classname = get_class($event);

        if (!array_key_exists($classname, self::$listeners)) return;

        /**
         * @type Action
         */
        $action = self::$listeners[$classname];


        if ($action == null) return;

        /**
         * @type Response
         */
        $response = $action ? $action->listen($event) : null;

        if (isset($response)) $this->handle($response);
    }

    static function setupDefaultListeners() {
        self::$listeners = [
            \Flarum\Post\Event\Posted::class => new Actions\Post\Posted(),
            \Flarum\Discussion\Event\Started::class => new Actions\Discussion\Started(),
        ];
    }

    /**
     * @param Response $response
     * @throws \Exception
     */
    private function handle(Response $response) {
        if (!$response) return;

        foreach(Webhook::all() as $webhook) {
            // TODO: extendable list w/ adapters
            if ($webhook->service == "discord") {
                (new Adapters\Discord\Adapter())->handle($webhook, $response);
            } else if ($webhook->service == "slack") {
                (new Adapters\Slack\Adapter())->handle($webhook, $response);
            }
        }
    }
}