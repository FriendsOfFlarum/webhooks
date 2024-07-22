<?php

namespace BeB\Webhooks\Actions\Post;

use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Revised extends Action
{
    const EVENT = \Flarum\Post\Event\Revised::class;

    /**
     * @param Webhook                    $webhook
     * @param \Flarum\Post\Event\Revised $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.revised', $event->post->discussion->title)
            )
            ->setUrl(
                'discussion',
                [
                    'id' => $event->post->discussion->id,
                ],
                '/'.$event->post->number
            )
            ->setDescription(Post::getContent($event->post, $webhook))
            ->setAuthor($event->actor)
            ->setColor('26de81')
            ->setTimestamp($event->post->edited_at);
    }
}
