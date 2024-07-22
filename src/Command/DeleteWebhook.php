<?php

namespace BeB\Webhooks\Command;

use Flarum\User\User;

class DeleteWebhook
{
    /**
     * The ID of the webhook to delete.
     *
     * @var int
     */
    public $webhookId;

    /**
     * The user performing the action.
     *
     * @var User
     */
    public $actor;

    /**
     * Any other webhook input associated with the action. This is unused by
     * default, but may be used by extensions.
     *
     * @var array
     */
    public $data;

    /**
     * @param int   $webhookId The ID of the webhook to delete.
     * @param User  $actor     The user performing the action.
     * @param array $data      Any other reaction input associated with the action. This
     *                         is unused by default, but may be used by extensions.
     */
    public function __construct(int $webhookId, User $actor, array $data = [])
    {
        $this->webhookId = $webhookId;
        $this->actor = $actor;
        $this->data = $data;
    }
}
