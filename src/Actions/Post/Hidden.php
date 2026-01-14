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

use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\Post\Event\Hidden>
 */
class Hidden extends Action
{
    public const EVENT = \Flarum\Post\Event\Hidden::class;

    public function handle(Webhook $webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.hidden', $event->post->discussion->title)
            )
            ->setUrl(
                'discussion',
                [
                    'id' => $event->post->discussion->id,
                ],
                '/'.$event->post->number
            )
            ->setDescription(Post::getContent($event->post, $webhook))
            ->setAuthor($event->actor)
            ->setColor('26de81')
            ->setTimestamp($event->post->hidden_at);
    }
}
