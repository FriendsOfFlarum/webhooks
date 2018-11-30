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

namespace Reflar\Webhooks\Actions\Discussion;

use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Started extends Action
{
    /**
     * @param \Flarum\Discussion\Event\Started $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.started', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription($event->discussion->firstPost->content)
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->created_at);
    }

    /**
     * @return string
     */
    public function getEvent()
    {
        return \Flarum\Discussion\Event\Started::class;
    }
}
