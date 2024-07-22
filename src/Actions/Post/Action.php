<?php

namespace BeB\Webhooks\Actions\Post;

use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use BeB\Webhooks\Models\Webhook;

abstract class Action extends \BeB\Webhooks\Action
{
    public function ignore(Webhook $webhook, $event): bool
    {
        if ($webhook->asGuest() && !$event->post->isVisibleTo(new Guest())) {
            return true;
        }

        $discussion = $event->post->discussion;
        $tagIds = $webhook->tag_id;
        $tagsIsEnabled = resolve(ExtensionManager::class)->isEnabled('flarum-tags');

        if ($discussion && !empty($tagIds) && $tagsIsEnabled && !$discussion->tags()->whereIn('id', $tagIds)->exists()) {
            return true;
        }

        return false;
    }
}
