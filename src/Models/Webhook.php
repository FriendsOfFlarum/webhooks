<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Models;

use Flarum\Database\AbstractModel;
use Flarum\Group\Group;
use Flarum\Tags\Tag;
use FoF\Webhooks\Adapters\Adapters;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string service
 * @property string url
 * @property string error
 * @property string events
 * @property number group_id
 * @property number tag_id
 * @property string extra_text
 * @property Group|null group
 * @property Tag|null tag
 * @property bool use_plain_text
 * @property ?int max_post_content_length
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
    public static function build(string $service, string $url): Webhook
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

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }

    public function asGuest(): bool
    {
        $group = $this->group;

        return !$group || $group->id == Group::GUEST_ID;
    }
}
