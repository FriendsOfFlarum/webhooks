<?php

namespace BeB\Webhooks\Actions\Post;

use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Hidden extends Action
{
    const EVENT = \Flarum\Post\Event\Hidden::class;

    /**
     * @param Webhook                   $webhook
     * @param \Flarum\Post\Event\Hidden $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.hidden', $event->post->discussion->title)
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
            ->setTimestamp($event->post->hidden_at);
    }
}
