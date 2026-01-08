<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Discussion;

use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;

/**
 * @extends Action<\Flarum\Discussion\Event\Renamed>
 */
class Renamed extends Action
{
    public const EVENT = \Flarum\Discussion\Event\Renamed::class;

    public function handle(Webhook $webhook, $event): ?Response
    {
        return Response::build($event)
            ->setTitle(
                $this->translate('discussion.renamed.title', $event->oldTitle)
            )
            ->setURL('discussion', [
                'id' => $event->discussion->id,
            ])
            ->setDescription($this->translate('discussion.renamed.description', $event->discussion->title))
            ->setAuthor($event->actor)
            ->setColor('fed330')
            ->setTimestamp($event->discussion->last_posted_at);
    }
}
