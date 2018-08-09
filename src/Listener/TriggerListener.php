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
    protected static $listeners = [];

    /**
     * EventListener constructor.
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;

        self::$listeners = [
            \Flarum\Post\Event\Posted::class => new Actions\Post\Posted(),
            \Flarum\Discussion\Event\Started::class => new Actions\Discussion\Started(),
        ];
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

    /**
     * @param Response $response
     * @throws \Exception
     */
    private function handle(Response $response) {
        if (!$response) return;

        (new Adapters\Discord\Adapter())->send("https://canary.discordapp.com/api/webhooks/358753571426009088/2_ZT5qtPYv4tKdybEeF9cdd9KaN3prRuXPqVw7KoV_p181E7x4g3K-Z_EBVXegYeIS6Z", $response);

//        Adapters\Discord\Adapter::send($response->toDiscord());
//        if (isset(Slack::$webhook)) Slack::send($response->toSlack());
    }
}