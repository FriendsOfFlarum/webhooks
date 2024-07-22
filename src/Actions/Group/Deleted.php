<?php

namespace BeB\Webhooks\Actions\Group;

use Carbon\Carbon;
use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Deleted extends Action
{
    const EVENT = \Flarum\Group\Event\Deleted::class;

    /**
     * @param \Flarum\Group\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event): Response
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
