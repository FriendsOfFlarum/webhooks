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

namespace Reflar\Webhooks\Adapters;

use ArrayObject;

class Adapters
{
    /**
     * @var ArrayObject<String, Adapter>
     */
    private static $adapters = null;

    /**
     * @param string $name
     * @param Adapter $adapter
     */
    public static function add(string $name, Adapter $adapter)
    {
        self::$adapters[$name] = $adapter;
    }

    /**
     * @param string $name
     * @return Adapter
     */
    public static function get(string $name)
    {
        return self::$adapters[$name];
    }

    public static function length()
    {
         return isset($adapters) ? count(self::$adapters) : 0;
    }

    static function initialize()
    {
        self::add("discord", new Discord\Adapter());
        self::add("slack", new Slack\Adapter());
    }

    static function all()
    {
        if (self::$adapters == null) self::initialize();

        return self::$adapters;
    }
}