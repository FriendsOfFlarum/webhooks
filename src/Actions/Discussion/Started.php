<?php

namespace BeB\Webhooks\Actions\Discussion;

use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Started extends Action
{
    const EVENT = \Flarum\Discussion\Event\Started::class;

    /**
     * @param Webhook                          $webhook
     * @param \Flarum\Discussion\Event\Started $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.started', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription(Post::getContent($event->discussion->firstPost, $webhook))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->created_at);
    }
}
