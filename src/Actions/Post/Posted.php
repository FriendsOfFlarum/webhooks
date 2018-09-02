<?php

/**
 *  This file is part of reflar/webhooks.
 *
 *  Copyright (c) ReFlar.
 *
 *  https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Actions\Post;


use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Posted extends Action
{
    /**
     * @param \Flarum\Post\Event\Posted $event
     * @return Response
     */
    function listen($event)
    {
        return Response::build()
            ->setTitle(
                $this->translate('post.posted', $event->post->discussion->title)
            )
            ->setUrl('discussion', [
                    'id' => $event->post->discussion->id
                ], '/' . $event->post->number
            )
            ->setDescription($event->post->content)
            ->setAuthor($event->actor)
            ->setTimestamp($event->post->time);
    }

    function ignore($event)
    {
        return !isset($event->post->discussion->start_post_id) || $event->post->id == $event->post->discussion->start_post_id;
    }
}