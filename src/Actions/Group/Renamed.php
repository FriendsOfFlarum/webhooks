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

namespace FoF\Webhooks\Actions\Group;

use Carbon\Carbon;
use FoF\Webhooks\Action;
use FoF\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\Group\Event\Renamed::class;

    /**
     * @param \Flarum\Group\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event)
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
