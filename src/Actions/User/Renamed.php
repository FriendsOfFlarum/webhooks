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

use Carbon\Carbon;
use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Renamed extends Action
{
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

    /**
     * @return string
     */
    public function getEvent()
    {
        return \Flarum\User\Event\Renamed::class;
    }
}
