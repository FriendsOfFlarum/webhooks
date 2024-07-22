<?php

namespace BeB\Webhooks\Actions\Discussion;

use Carbon\Carbon;
use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Restored extends Action
{
    const EVENT = \Flarum\Discussion\Event\Restored::class;

    /**
     * @param Webhook                           $webhook
     * @param \Flarum\Discussion\Event\Restored $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        $firstPost = $event->discussion->firstPost;

        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.restored', $event->discussion->title)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription(Post::getContent($firstPost, $webhook))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp(Carbon::now());
    }
}
