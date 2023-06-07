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

use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

class Approved extends Posted
{
    const EVENT = \Flarum\Approval\Event\PostWasApproved::class;

    /**
     * @param Webhook                                $webhook
     * @param \Flarum\Approval\Event\PostWasApproved $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        $response = parent::handle($webhook, $event);

        if (!$webhook->asGuest()) {
            $response
                ->setTitle(
                    $this->translate('post.approved', $event->post->discussion->title)
                )
                ->setDescription(null);
        } else {
            $response->setAuthor($event->post->user);
        }

        return $response;
    }

    public function ignore(Webhook $webhook, $event): bool
    {
        return Action::ignore($webhook, $event);
    }
}
