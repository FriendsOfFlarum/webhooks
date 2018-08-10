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

namespace Reflar\Webhooks\Extend;


use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;
use Reflar\Webhooks\Listener\TriggerListener;

class ReflarWebhooksExtender implements ExtenderInterface
{
    private $listeners = [];

    // TODO: implement
    private $adapters = [];

    public function __construct() {}

    public function listener($clazz, $action) {
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