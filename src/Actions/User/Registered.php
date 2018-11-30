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

namespace Reflar\Webhooks\Actions\User;

use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Registered extends Action
{
    /**
     * @param \Flarum\User\Event\Registered $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.registered')
            )
            ->setUrl('user', [
                'username' => $event->user->username,
            ])
            ->setAuthor($event->user)
            ->setColor('4b7bec')
            ->setTimestamp($event->user->joined_at);
    }

    /**
     * @return string
     */
    public function getEvent()
    {
        return \Flarum\User\Event\Registered::class;
    }
}
