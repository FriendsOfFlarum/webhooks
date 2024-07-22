<?php

namespace BeB\Webhooks\Actions\Discussion;

use BeB\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\Discussion\Event\Renamed::class;

    /**
     * @param \Flarum\Discussion\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.renamed.title', $event->oldTitle)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription($this->translate('discussion.renamed.description', $event->discussion->title))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->last_posted_at);
    }
}
