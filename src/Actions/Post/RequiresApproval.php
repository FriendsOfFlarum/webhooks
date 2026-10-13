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

use Flarum\Extension\ExtensionManager;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

class RequiresApproval extends Posted
{
    const EVENT = \Flarum\Post\Event\Posted::class;
    const DEPENDS_ON = \Flarum\Approval\Event\PostWasApproved::class;
    const NAME = 'Flarum\Approval\Event\PostRequiresApproval';

    /**
     * @param Webhook                   $webhook
     * @param \Flarum\Post\Event\Posted $event
     *
     * @return Response
     */
    public function handle(Webhook $webhook, $event): Response
    {
        $response = parent::handle($webhook, $event);

        return $response->setTitle(
            $this->translate('post.requires_approval', $event->post->discussion->title)
        );
    }

    /**
     * @param Webhook                   $webhook
     * @param \Flarum\Post\Event\Posted $event
     *
     * @return bool
     */
    public function ignore(Webhook $webhook, $event): bool
    {
        if (!resolve(ExtensionManager::class)->isEnabled('flarum-approval')) {
            return true;
        }

        if ($event->post->is_approved !== false) {
            // Only notify while the post is still pending approval
            return true;
        }

        return Action::ignore($webhook, $event);
    }
}
