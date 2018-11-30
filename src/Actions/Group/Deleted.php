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

namespace Reflar\Webhooks\Actions\Group;

use Carbon\Carbon;
use Reflar\Webhooks\Action;
use Reflar\Webhooks\Response;

class Deleted extends Action
{
    /**
     * @param \Flarum\Group\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event)
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('group.deleted', $event->group->name_plural)
            )
            ->setAuthor($event->actor)
            ->setColor('34495e')
            ->setTimestamp(Carbon::now());
    }

    /**
     * @return string
     */
    public function getEvent()
    {
        return \Flarum\Group\Event\Deleted::class;
    }
}
