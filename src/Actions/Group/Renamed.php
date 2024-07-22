<?php

namespace BeB\Webhooks\Actions\Group;

use Carbon\Carbon;
use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\Group\Event\Renamed::class;

    /**
     * @param \Flarum\Group\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event): Response
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
