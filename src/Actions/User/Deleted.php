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

class Deleted extends Action
{
    const EVENT = \Flarum\User\Event\Deleted::class;

    /**
     * @param \Flarum\User\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.deleted', $event->user->username)
            )
            ->setAuthor($event->actor)
            ->setColor('4b7bec')
            ->setTimestamp(Carbon::now());
    }
}
