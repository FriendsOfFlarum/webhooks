<?php

namespace BeB\Webhooks\Actions\User;

use Carbon\Carbon;
use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\User\Event\Renamed::class;

    /**
     * @param \Flarum\User\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.renamed.title', $event->oldUsername)
            )
            ->setURL('user', [
                'username' => $event->user->username,
            ])
            ->setDescription($this->translate('user.renamed.description', $event->user->username))
            ->setAuthor($event->actor)
            ->setColor('4b7bec')
            ->setTimestamp(Carbon::now());
    }
}
