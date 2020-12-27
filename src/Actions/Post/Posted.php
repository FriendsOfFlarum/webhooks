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

use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

class Posted extends Action
{
    const EVENT = \Flarum\Post\Event\Posted::class;

    /**
     * @param \Flarum\Post\Event\Posted $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.posted', $event->post->discussion->title)
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
            ->setTimestamp($event->post->created_at);
    }

    /**
     * @param \Flarum\Post\Event\Posted $event
     * @param Webhook                   $webhook
     *
     * @return bool
     */
    public function ignore($event, Webhook $webhook): bool
    {
        return parent::ignore($event, $webhook) || !isset($event->post->discussion->first_post_id) || $event->post->id == $event->post->discussion->first_post_id;
    }
}
