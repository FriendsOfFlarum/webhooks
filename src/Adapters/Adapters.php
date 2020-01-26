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

namespace Reflar\Webhooks\Adapters;

use ArrayObject;

class Adapters
{
    /**
     * @var ArrayObject<String, String>
     */
    private static $adapters = [
        Discord\Adapter::NAME => Discord\Adapter::class,
        Slack\Adapter::NAME   => Slack\Adapter::class,
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
        $adapter = array_get(self::$adapters, $name);

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
