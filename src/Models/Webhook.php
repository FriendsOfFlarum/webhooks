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
use Flarum\Group\Group;
use Reflar\Webhooks\Adapters\Adapters;

/**
 * @property string service
 * @property string url
 * @property string error
 * @property string events
 * @property number group_id
 * @property string extra_text
 * @property Group|null group
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

    public function isValid(): bool
    {
        $adapter = Adapters::get($this->service);

        return isset($adapter) && $adapter::isValidURL($this->url);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function asGuest()
    {
        $group = $this->group;

        return !$group || $group->id == Group::GUEST_ID;
    }
}
