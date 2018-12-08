<?php

/*
 * This file is part of reflar/webhooks.
 *
 * Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Actions\Post;

use Carbon\Carbon;
use Reflar\Webhooks\Response;

class Restored extends Action
{
    const EVENT = \Flarum\Post\Event\Restored::class;

    /**
     * @param \Flarum\Post\Event\Restored $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.restored', $event->post->discussion->title)
            )
            ->setUrl('discussion', [
                    'id' => $event->post->discussion->id,
                ], '/'.$event->post->number
            )
            ->setDescription($event->post->content)
            ->setAuthor($event->actor)
            ->setColor('26de81')
            ->setTimestamp(Carbon::now());
    }
}
