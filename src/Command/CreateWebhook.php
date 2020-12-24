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

namespace FoF\Webhooks\Command;

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
