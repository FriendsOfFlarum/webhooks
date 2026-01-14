<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Group;

use Carbon\Carbon;
use FoF\Webhooks\Action;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\Group\Event\Deleted>
 */
class Deleted extends Action
{
    public const EVENT = \Flarum\Group\Event\Deleted::class;

    public function handle(Webhook $webhook, $event): ?Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('group.deleted', $event->group->name_plural)
            )
            ->setAuthor($event->actor)
            ->setColor('34495e')
            ->setTimestamp(Carbon::now());
    }
}
