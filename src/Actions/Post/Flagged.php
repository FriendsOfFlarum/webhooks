<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Post;

use Carbon\Carbon;
use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use FoF\Webhooks\Helpers\Post;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

class Flagged extends Action
{
    const EVENT = \Flarum\Flags\Event\Created::class;

    /**
     * @param Webhook                     $webhook
     * @param \Flarum\Flags\Event\Created $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        $post = $event->flag->post;

        $response = Response::build($event)
            ->setTitle(
                $this->translate('post.flagged', $post->discussion ? $post->discussion->title : '')
            )
            ->setDescription(Post::getContent($post, $webhook))
            ->setColor('e74c3c')
            ->setTimestamp($event->flag->created_at ?: Carbon::now());

        if ($post->discussion) {
            $response->setUrl(
                'discussion',
                [
                    'id' => $post->discussion->id,
                ],
                '/'.$post->number
            );
        }

        if (isset($event->actor)) {
            $response->setAuthor($event->actor);
        }

        return $response;
    }

    /**
     * @param Webhook                     $webhook
     * @param \Flarum\Flags\Event\Created $event
     *
     * @return bool
     */
    public function ignore(Webhook $webhook, $event): bool
    {
        if (!resolve(ExtensionManager::class)->isEnabled('flarum-flags')) {
            return true;
        }

        $post = $event->flag->post ?? null;
        if (!$post) {
            return true;
        }

        if ($webhook->asGuest() && !$post->isVisibleTo(new Guest())) {
            return true;
        }

        $discussion = $post->discussion;
        $tagIds = $webhook->tag_id;
        $tagsIsEnabled = resolve(ExtensionManager::class)->isEnabled('flarum-tags');

        if ($discussion && !empty($tagIds) && $tagsIsEnabled && !$discussion->tags()->whereIn('id', $tagIds)->exists()) {
            return true;
        }

        return false;
    }
}

