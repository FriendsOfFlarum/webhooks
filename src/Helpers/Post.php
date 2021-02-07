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

use Flarum\Post\CommentPost;
use FoF\Webhooks\Models\Webhook;
use Html2Text\Html2Text;

class Post
{
    /**
     * @param \Flarum\Post\Post $post
     * @param Webhook|null $webhook
     * @return string|null
     */
    public static function getContent(\Flarum\Post\Post $post, Webhook $webhook = null): ?string
    {
        if (!$post || is_array($post->content)) {
            return null;
        }

        $content = $post->content;

        if (isset($webhook) && $post instanceof CommentPost) {
            if ($webhook->use_plain_text) {
                $content = (new Html2Text($post->formatContent()))->getText();
            }
        }

        return $content;
    }
}
