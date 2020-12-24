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

use Carbon\Carbon;
use FoF\Webhooks\Action;
use FoF\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\User\Event\Renamed::class;

    /**
     * @param \Flarum\User\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.renamed.title', $event->oldUsername)
            )
            ->setURL('user', [
                'username' => $event->user->username,
            ])
            ->setDescription($this->translate('user.renamed.description', $event->user->username))
            ->setAuthor($event->actor)
            ->setColor('4b7bec')
            ->setTimestamp(Carbon::now());
    }
}
