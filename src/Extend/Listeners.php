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

namespace ReFlar\Webhooks\Extend;


use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;
use Reflar\Webhooks\Listener\TriggerListener;

class Listeners implements ExtenderInterface
{
    protected $listeners = [];

    public function __construct() {}

    public function add($clazz, $action) {
        assert(isset($clazz) && is_string($clazz), "\$clazz must be a string");
        assert(isset($action), "\$action is required");

        if (is_string($action)) {
            $action = (new \ReflectionClass($action))->newInstance();
        }

        $this->listeners[$clazz] = $action;

        return $this;
    }

    public function __invoke(Container $container, Extension $extension = null)
    {
        if (TriggerListener::$listeners == null) TriggerListener::setupDefaultListeners();

        foreach($this->listeners as $clazz => $action) {
            TriggerListener::$listeners[$clazz] = $action;
        }
    }
}