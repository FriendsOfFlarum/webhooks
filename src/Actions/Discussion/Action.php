<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
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
    public function ignore(Webhook $webhook, $event): bool
    {
        /**
         * @var Discussion $discussion
         */
        $discussion = $event->discussion;
        $post = $discussion->firstPost ?? $discussion->posts()->where('number', 1)->first();

        if ($webhook->asGuest() && $post && !$post->isVisibleTo(new Guest())) {
            return true;
        }

        $tagIds = $webhook->tag_id;
        $tagsIsEnabled = resolve(ExtensionManager::class)->isEnabled('flarum-tags');

        /** @phpstan-ignore-next-line */
        if (!empty($tagIds) && $tagsIsEnabled && !$discussion->tags()->whereIn('id', $webhook->tag_id)->exists()) {
            return true;
        }

        return false;
    }
}
