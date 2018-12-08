<?php

/*
 * This file is part of reflar/webhooks.
 *
 * Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Actions\Discussion;

use Reflar\Webhooks\Response;

class Renamed extends Action
{
    const EVENT = \Flarum\Discussion\Event\Renamed::class;

    /**
     * @param \Flarum\Discussion\Event\Renamed $event
     *
     * @return Response
     */
    public function listen($event)
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
