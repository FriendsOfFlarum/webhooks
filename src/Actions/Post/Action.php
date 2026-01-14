<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Post;

use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use FoF\Webhooks\Models\Webhook;

/**
 * @template T
 *
 * @extends \FoF\Webhooks\Action<T>
 */
abstract class Action extends \FoF\Webhooks\Action
{
    public function ignore(Webhook $webhook, $event): bool
    {
        if ($webhook->asGuest() && !$event->post->isVisibleTo(new Guest())) {
            return true;
        }

        $discussion = $event->post->discussion;
        $tagIds = $webhook->tag_id;
        $tagsIsEnabled = resolve(ExtensionManager::class)->isEnabled('flarum-tags');

        return $discussion && !empty($tagIds) && $tagsIsEnabled && !$discussion->tags()->whereIn('id', $tagIds)->exists();
    }
}
