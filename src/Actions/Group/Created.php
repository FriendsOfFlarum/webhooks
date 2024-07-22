<?php

namespace BeB\Webhooks\Actions\Group;

use Carbon\Carbon;
use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Created extends Action
{
    const EVENT = \Flarum\Group\Event\Created::class;

    /**
     * @param \Flarum\Group\Event\Created $event
     *
     * @return Response
     */
    public function listen($event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('group.created', $event->group->name_plural)
            )
            ->setAuthor($event->actor)
            ->setColor('34495e')
            ->setTimestamp(Carbon::now());
    }
}
