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

namespace Reflar\Webhooks\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;
use Reflar\Webhooks\Action;
use Reflar\Webhooks\Adapters\Adapter;
use Reflar\Webhooks\Adapters\Adapters;
use Reflar\Webhooks\Listener\TriggerListener;

class ReflarWebhooksExtender implements ExtenderInterface
{
    private $listeners = [];
    private $adapters = [];

    public function __construct()
    {
    }

    /**
     * @param Action|string $action
     *
     * @return $this
     */
    public function listener($action)
    {
        assert(isset($action), '$action is required');

        $clazz = @constant("$action::EVENT");

        if (isset($clazz)) {
            $this->listeners[$clazz] = $action;
        }

        return $this;
    }

    /**
     * @param Adapter|string $adapter
     *
     * @return $this
     */
    public function adapter($adapter)
    {
        assert(isset($adapter), '$adapter is required');

        $name = @constant("$adapter::NAME");

        if (isset($name)) {
            $this->adapters[$name] = $adapter;
        }

        return $this;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        if (TriggerListener::$listeners == null) {
            TriggerListener::setupDefaultListeners();
        }

        foreach ($this->listeners as $action) {
            TriggerListener::addListener($action);
        }

        foreach ($this->adapters as $name => $adapter) {
            Adapters::add($name, $adapter);
        }
    }
}
