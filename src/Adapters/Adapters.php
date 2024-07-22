<?php

namespace BeB\Webhooks\Adapters;

use Illuminate\Support\Arr;

class Adapters
{
    /**
     * @var array<string, string>
     */
    private static $adapters = [
        Discord\Adapter::NAME          => Discord\Adapter::class,
        Slack\Adapter::NAME            => Slack\Adapter::class,
        MicrosoftTeams\Adapter::NAME   => MicrosoftTeams\Adapter::class,
        Telegram\Adapter::NAME         => Telegram\Adapter::class,
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
            return resolve($adapter);
        }

        return null;
    }

    public static function length(): int
    {
        return count(self::$adapters);
    }

    public static function all()
    {
        return self::$adapters;
    }
}
