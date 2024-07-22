<?php

namespace BeB\Webhooks\Command;

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
    public function __construct(User $actor, array $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }
}
