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

use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\Discussion\Event\Hidden>
 */
class Hidden extends Action
{
    public const EVENT = \Flarum\Discussion\Event\Hidden::class;

    public function handle(Webhook $webhook, $event): Response
    {
        $firstPost = $event->discussion->firstPost;

        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.hidden', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription(Post::getContent($firstPost, $webhook))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->hidden_at);
    }
}
