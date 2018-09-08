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

namespace Reflar\Webhooks\Actions\Discussion;


use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Started extends Action
{

    /**
     * @param \Flarum\Discussion\Event\Started $event
     * @return Response
     */
    function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.started', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id
            ])
            ->setDescription($event->discussion->startPost->content)
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->start_time);
    }
}