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

namespace FoF\Webhooks\Helpers;

class Post
{
    public static function getContent(\Flarum\Post\Post $post): ?string
    {
        if (!$post || is_array($post->content)) {
            return null;
        }

        return $post->content;
    }
}
