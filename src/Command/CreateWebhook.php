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

namespace Reflar\Webhooks\Command;

use Flarum\User\User;

class CreateWebhook
{
    /**
     * The user that created the webhook.
     *
     * @var User
     */
    public $actor;

    /**
     * The attributes of the new webhook.
     *
     * @var array
     */
    public $data;

    /**
     * @param User  $actor
     * @param array $data
     */
    public function __construct($actor, $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }
}
