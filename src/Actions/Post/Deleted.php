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

namespace FoF\Webhooks\Actions\Post;

use Carbon\Carbon;
use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Response;

class Deleted extends Action
{
    const EVENT = \Flarum\Post\Event\Deleted::class;

    /**
     * @param \Flarum\Post\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.deleted', $event->post->discussion->title)
            )
            ->setUrl(
                'discussion',
                [
                    'id' => $event->post->discussion->id,
                ],
                '/'.$event->post->number
            )
            ->setDescription(Post::getContent($event->post))
            ->setAuthor($event->actor)
            ->setColor('26de81')
            ->setTimestamp(Carbon::now());
    }
}
