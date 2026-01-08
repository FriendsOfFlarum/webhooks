<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\User;

use Carbon\Carbon;
use FoF\Webhooks\Action;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\User\Event\Deleted>
 */
class Deleted extends Action
{
    public const EVENT = \Flarum\User\Event\Deleted::class;

    public function handle($webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.deleted', $event->user->display_name)
            )
            ->setAuthor($event->actor)
            ->setColor('4b7bec')
            ->setTimestamp(Carbon::now());
    }
}
