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

namespace Reflar\Webhooks\Actions\User;


use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Registered extends Action
{
    /**
     * @param \Flarum\User\Event\Registered $event
     * @return Response
     */
    function listen($event)
    {
        return Response::build()
            ->setTitle(
                $this->translate('user.registered')
            )
            ->setUrl('user', [
                'username' => $event->user->username
            ])
            ->setAuthor($event->user)
            ->setTimestamp($event->user->join_time);
    }
}