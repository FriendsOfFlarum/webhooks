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

use Flarum\User\Guest;

abstract class Action extends \Reflar\Webhooks\Action
{
    public function ignore($event, bool $asGuest): bool
    {
        $post = $event->discussion->firstPost ?? $event->discussion->posts()->where('number', 1)->first();

        return $asGuest && $post && !$post->isVisibleTo(new Guest());
    }
}
