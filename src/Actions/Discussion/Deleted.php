<?php

namespace BeB\Webhooks\Actions\Discussion;

use Carbon\Carbon;
use BeB\Webhooks\Response;

class Deleted extends Action
{
    const EVENT = \Flarum\Discussion\Event\Deleted::class;

    /**
     * @param \Flarum\Discussion\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event): Response
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
