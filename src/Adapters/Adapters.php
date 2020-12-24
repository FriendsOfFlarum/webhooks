<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * https://friendsofflarum.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Adapters;

use ArrayObject;
use Illuminate\Support\Arr;

class Adapters
{
    /**
     * @var ArrayObject<String, String>
     */
    private static $adapters = [
        Discord\Adapter::NAME          => Discord\Adapter::class,
        Slack\Adapter::NAME            => Slack\Adapter::class,
        MicrosoftTeams\Adapter::NAME   => MicrosoftTeams\Adapter::class,
    ];

    /**
     * @param string $name
     * @param string $adapter
     */
    public static function add(string $name, string $adapter)
    {
        self::$adapters[$name] = $adapter;
    }

    /**
     * @param string $name
     *
     * @return null|Adapter
     */
    public static function get(string $name): ?Adapter
    {
        $adapter = Arr::get(self::$adapters, $name);

        if (isset($adapter)) {
            return app()->make($adapter);
        }

        return null;
    }

    public static function length(): int
    {
        return isset($adapters) ? count(self::$adapters) : 0;
    }

    public static function all()
    {
        return self::$adapters;
    }
}
