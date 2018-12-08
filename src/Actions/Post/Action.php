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

namespace ReFlar\Webhooks\Actions\Post;

abstract class Action extends \Reflar\Webhooks\Action
{
    public function ignore($event) : bool
    {
        return $event->post->discussion->is_private;
    }
}
