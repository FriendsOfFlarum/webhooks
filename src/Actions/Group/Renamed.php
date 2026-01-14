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
 * @extends Action<\Flarum\Group\Event\Renamed>
 */
class Renamed extends Action
{
    public const EVENT = \Flarum\Group\Event\Renamed::class;

    public function handle(Webhook $webhook, $event): ?Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('group.renamed', $event->group->name_singular)
            )
            ->setAuthor($event->actor)
            ->setColor('34495e')
            ->setTimestamp(Carbon::now());
    }
}
