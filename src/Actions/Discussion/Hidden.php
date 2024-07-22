<?php

namespace BeB\Webhooks\Actions\Discussion;

use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Hidden extends Action
{
    const EVENT = \Flarum\Discussion\Event\Hidden::class;

    /**
     * @param Webhook                         $webhook
     * @param \Flarum\Discussion\Event\Hidden $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        $firstPost = $event->discussion->firstPost;

        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.hidden', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription(Post::getContent($firstPost, $webhook))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->hidden_at);
    }
}
