<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * https://friendsofflarum.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Post;

use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use FoF\Webhooks\Models\Webhook;

abstract class Action extends \FoF\Webhooks\Action
{
    public function ignore($event, Webhook $webhook): bool
    {
        if ($webhook->asGuest() && !$event->post->isVisibleTo(new Guest())) {
            return true;
        }

        $discussion = $event->post->discussion;
        $tag = $webhook->tag;
        $tagsIsEnabled = app(ExtensionManager::class)->isEnabled('flarum-tags');

        if ($discussion && $tag && $tagsIsEnabled && !$discussion->tags()->where('id', $tag->id)->exists()) {
            return true;
        }

        return false;
    }
}
