<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * https://friendsofflarum.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Actions\Post;

use Flarum\User\Guest;

abstract class Action extends \FoF\Webhooks\Action
{
    public function ignore($event, bool $asGuest): bool
    {
        return $asGuest && !$event->post->isVisibleTo(new Guest());
    }
}
