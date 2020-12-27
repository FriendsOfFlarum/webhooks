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

namespace FoF\Webhooks\Actions\Discussion;

use Flarum\Discussion\Discussion;
use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use FoF\Webhooks\Models\Webhook;

abstract class Action extends \FoF\Webhooks\Action
{
    public function ignore($event, Webhook $webhook): bool
    {
        /**
         * @var Discussion $discussion
         */
        $discussion = $event->discussion;
        $post = $discussion->firstPost ?? $discussion->posts()->where('number', 1)->first();

        if ($webhook->asGuest() && $post && !$post->isVisibleTo(new Guest())) {
            return true;
        }

        $tag = $webhook->tag;
        $tagsIsEnabled = app(ExtensionManager::class)->isEnabled('flarum-tags');

        if ($tag && $tagsIsEnabled && !$discussion->tags()->where('id', $tag->id)->exists()) {
            return true;
        }

        return false;
    }
}
