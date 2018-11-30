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

namespace Reflar\Webhooks\Models;

use Flarum\Database\AbstractModel;
use Reflar\Webhooks\Adapters\Adapters;

/**
 * @property string service
 * @property string url
 * @property string error
 * @property string events
 */
class Webhook extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'webhooks';

    /**
     * @param string $service
     * @param string $url
     *
     * @return static
     */
    public static function build(string $service, string $url)
    {
        $webhook = new static();
        $webhook->service = $service;
        $webhook->url = $url;
        $webhook->events = '[]';

        return $webhook;
    }

    public function getEvents()
    {
        return json_decode($this->events);
    }

    public function isValid() : bool
    {
        $adapter = Adapters::get($this->service);

        return isset($adapter) && $adapter->isValidURL($this->url);
    }
}
