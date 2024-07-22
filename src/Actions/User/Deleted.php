<?php

namespace BeB\Webhooks\Actions\User;

use Carbon\Carbon;
use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Deleted extends Action
{
    const EVENT = \Flarum\User\Event\Deleted::class;

    /**
     * @param \Flarum\User\Event\Deleted $event
     *
     * @return Response
     */
    public function listen($event): Response
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
