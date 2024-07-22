<?php

namespace BeB\Webhooks\Actions\Post;

use BeB\Webhooks\Helpers\Post;
use BeB\Webhooks\Models\Webhook;
use BeB\Webhooks\Response;

class Posted extends Action
{
    const EVENT = \Flarum\Post\Event\Posted::class;

    /**
     * @param Webhook                                                          $webhook
     * @param \Flarum\Post\Event\Posted|\Flarum\Approval\Event\PostWasApproved $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('post.posted', $event->post->discussion->title)
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
            ->setTimestamp($event->post->created_at);
    }

    /**
     * @param \Flarum\Post\Event\Posted $event
     * @param Webhook                   $webhook
     *
     * @return bool
     */
    public function ignore(Webhook $webhook, $event): bool
    {
        return parent::ignore($webhook, $event) || !isset($event->post->discussion->first_post_id) || $event->post->id == $event->post->discussion->first_post_id;
    }
}
