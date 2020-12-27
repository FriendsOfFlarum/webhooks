<?php

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
