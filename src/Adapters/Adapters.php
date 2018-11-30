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
     * @var ArrayObject<String, Adapter>
     */
    private static $adapters = null;

    /**
     * @param Adapter $adapter
     */
    public static function add(Adapter $adapter)
    {
        self::$adapters[$adapter->getName()] = $adapter;
    }

    /**
     * @param string $name
     *
     * @return null|Adapter
     */
    public static function get(string $name) : ?Adapter
    {
        if (@self::$adapters == null) {
            self::initialize();
        }

        return @self::$adapters[$name];
    }

    public static function length() : int
    {
        return isset($adapters) ? count(self::$adapters) : 0;
    }

    public static function initialize()
    {
        self::add(new Discord\Adapter());
        self::add(new Slack\Adapter());
    }

    public static function all()
    {
        if (self::$adapters == null) {
            self::initialize();
        }

        return self::$adapters;
    }
}
