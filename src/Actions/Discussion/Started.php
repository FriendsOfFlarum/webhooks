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
     * @param $event
     * @return Response
     */
    function listen($event)
    {
        return Response::build()
            ->setTitle(
                $this->translate('discussion.started', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id
            ])
            ->setAuthor($event->actor)
            ->setColor("2ecc71")
            ->setTimestamp($event->discussion->start_time);
    }
}