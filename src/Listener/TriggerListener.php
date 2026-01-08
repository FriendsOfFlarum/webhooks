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
     * @var array<string, string>
     */
    public static ?array $listeners = null;

    protected static ?bool $isDebugging = null;

    public function __construct(protected SettingsRepositoryInterface $settings, protected Queue $queue)
    {
        if (self::$listeners === null) {
            self::setupDefaultListeners();
        }
    }

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events): void
    {
        $events->listen('*', [$this, 'run']);
    }

    /**
     * @param $name
     * @param $data
     *
     * @throws \ReflectionException
     */
    public function run($name, $data): void
    {
        $event = Arr::get($data, 0);

        if (!isset($event) || !array_key_exists($name, self::$listeners)) {
            return;
        }

        self::debug("$name: queuing");

        $this->queue->push(
            new HandleEvent($name, $event)
        );
    }

    public static function setupDefaultListeners(): void
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

        self::addListener(Actions\User\Renamed::class);
        self::addListener(Actions\User\Registered::class);
        self::addListener(Actions\User\Deleted::class);
    }

    public static function addListener(string $action): void
    {
        $clazz = @constant("$action::EVENT");

        if (isset($clazz) && class_exists($clazz)) {
            self::$listeners[$clazz] = $action;
        } elseif (!isset($clazz)) {
            echo "$action::EVENT does not exist";
        }
    }

    public static function debug(string $message): void
    {
        if (is_null(self::$isDebugging)) {
            self::$isDebugging = (bool) (int) resolve('flarum.settings')->get('fof-webhooks.debug');
        }

        if (self::$isDebugging) {
            resolve('log')->info('[fof/webhooks] #DEBUG# '.$message);
        }
    }
}
