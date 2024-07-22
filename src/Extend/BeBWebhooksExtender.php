<?php

namespace BeB\Webhooks\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use BeB\Webhooks\Action;
use BeB\Webhooks\Adapters\Adapter;
use BeB\Webhooks\Adapters\Adapters;
use BeB\Webhooks\Listener\TriggerListener;
use Illuminate\Contracts\Container\Container;

class BeBWebhooksExtender implements ExtenderInterface
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
    public function listener($action): BeBWebhooksExtender
    {
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
    public function adapter($adapter): BeBWebhooksExtender
    {
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
