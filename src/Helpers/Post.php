<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
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
     * @param \Flarum\Post\Post|null $post
     * @param Webhook|null           $webhook
     *
     * @return string|null
     */
    public static function getContent(?\Flarum\Post\Post $post, ?Webhook $webhook = null): ?string
    {
        /*
         * If no post is provided, return null.
         * Behavior with other extensions can sometimes cause posts passed (e.g. discussion's first post) to be null.
         * We don't want to ignore the event entirely, so we'll return empty content instead.
         * This is implemented here to avoid duplicate checks.
         */
        if (!$post) {
            return null;
        }

        $content = $post->content;

        if (isset($webhook) && $post instanceof CommentPost) {
            $maxLength = $webhook->max_post_content_length;

            if ($webhook->use_plain_text) {
                $content = (new Html2Text($post->formatContent()))->getText();
            }

            if ($maxLength) {
                $origLen = strlen($content);

                $content = trim(substr($content, 0, $maxLength));

                if ($origLen > $maxLength + 1) {
                    $content .= '...';
                }
            }
        }

        return $content;
    }
}
