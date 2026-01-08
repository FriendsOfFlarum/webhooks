<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Discussion;

use Carbon\Carbon;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\Discussion\Event\Deleted>
 */
class Deleted extends Action
{
    public const EVENT = \Flarum\Discussion\Event\Deleted::class;

    public function handle($webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.deleted', $event->discussion->title)
            )
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp(Carbon::now());
    }
}
