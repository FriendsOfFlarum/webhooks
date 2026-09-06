<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Listener;

use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Webhooks\Actions;
use FoF\Webhooks\Jobs\HandleEvent;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Queue\Queue;
use Illuminate\Support\Arr;

class TriggerListener
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Queue
     */
    protected $queue;

    /**
     * @var array<string, string>
     */
    public static $listeners = null;

    /**
     * Maps a real Flarum event class to the webhook-selectable identifiers it should queue.
     *
     * @var array<string, string[]>
     */
    public static $eventMap = [];

    /**
     * @var bool|null
     */
    protected static $isDebugging = null;

    /**
     * EventListener constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param Queue                       $queue
     */
    public function __construct(SettingsRepositoryInterface $settings, Queue $queue)
    {
        $this->settings = $settings;
        $this->queue = $queue;

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
        $event = Arr::get($data, 0);

        if (!isset($event) || empty(self::$eventMap[$name])) {
            return;
        }

        foreach (self::$eventMap[$name] as $identifier) {
            self::debug("$name: queuing as $identifier");

            $this->queue->push(
                new HandleEvent($identifier, $event)
            );
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
        self::addListener(Actions\Post\Approved::class);
        self::addListener(Actions\Post\RequiresApproval::class);

        self::addListener(Actions\User\Renamed::class);
        self::addListener(Actions\User\Registered::class);
        self::addListener(Actions\User\Deleted::class);
    }

    public static function addListener(string $action)
    {
        $clazz = defined("$action::EVENT") ? constant("$action::EVENT") : null;

        // Some actions listen to a core event but only make sense when another
        // (optional) extension's class is present, e.g. RequiresApproval needs flarum/approval.
        $dependsOn = defined("$action::DEPENDS_ON") ? constant("$action::DEPENDS_ON") : $clazz;

        // Actions may expose a distinct identifier so they can be selected independently
        // in the webhook UI even though they listen to the same underlying Flarum event.
        $identifier = defined("$action::NAME") ? constant("$action::NAME") : $clazz;

        if (isset($clazz) && class_exists($dependsOn)) {
            self::$listeners[$identifier] = $action;
            self::$eventMap[$clazz][] = $identifier;
        } elseif (!isset($clazz)) {
            echo "$action::EVENT does not exist";
        }
    }
    
    public static function debug(string $message)
    {
        if (is_null(self::$isDebugging)) {
            self::$isDebugging = (bool) (int) resolve('flarum.settings')->get('fof-webhooks.debug');
        }

        if (self::$isDebugging) {
            resolve('log')->info('[fof/webhooks] #DEBUG# '.$message);
        }
    }
}
