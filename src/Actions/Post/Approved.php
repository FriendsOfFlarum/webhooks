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

use Flarum\Discussion\Event\Started as DiscussionStartedEvent;
use FoF\Webhooks\Actions\Discussion\Started as DiscussionStartedAction;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

class Approved extends Posted
{
    public const EVENT = \Flarum\Approval\Event\PostWasApproved::class;

    public function handle(Webhook $webhook, $event): Response
    {
        /**
         * @var \Flarum\Approval\Event\PostWasApproved $event
         */
        if ($event->post->number === 1 && $webhook->asGuest()) {
            // Send the 'discussion started' message
            return resolve(DiscussionStartedAction::class)
                ->handle($webhook, new DiscussionStartedEvent($event->post->discussion, $event->post->user));
        }

        $response = parent::handle($webhook, $event);

        if (!$webhook->asGuest()) {
            // Send the 'approved' message as the user who approved the post
            $response
                ->setTitle(
                    $this->translate('post.approved', $event->post->discussion->title)
                )
                ->setDescription(null);
        } else {
            // Send the 'new post' message
            $response->setAuthor($event->post->user);
        }

        return $response;
    }

    public function ignore(Webhook $webhook, $event): bool
    {
        return Action::ignore($webhook, $event);
    }
}
