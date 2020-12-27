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

use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Response;

class Hidden extends Action
{
    const EVENT = \Flarum\Discussion\Event\Hidden::class;

    /**
     * @param \Flarum\Discussion\Event\Hidden $event
     *
     * @return Response
     */
    public function listen($event)
    {
        $firstPost = $event->discussion->firstPost;

        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.hidden', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription(Post::getContent($firstPost))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->hidden_at);
    }
}
