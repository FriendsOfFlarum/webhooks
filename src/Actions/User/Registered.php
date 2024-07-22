<?php

namespace BeB\Webhooks\Actions\User;

use BeB\Webhooks\Action;
use BeB\Webhooks\Response;

class Registered extends Action
{
    const EVENT = \Flarum\User\Event\Registered::class;

    /**
     * @param \Flarum\User\Event\Registered $event
     *
     * @return Response
     */
    public function listen($event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('user.registered')
            )
            ->setUrl('user', [
                'username' => $event->user->username,
            ])
            ->setAuthor($event->user)
            ->setColor('4b7bec')
            ->setTimestamp($event->user->joined_at);
    }
}
