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

namespace FoF\Webhooks\Actions\User;

use FoF\Webhooks\Action;
use FoF\Webhooks\Response;

class Registered extends Action
{
    const EVENT = \Flarum\User\Event\Registered::class;

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
}
