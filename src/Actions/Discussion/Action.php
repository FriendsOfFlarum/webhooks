<?php

namespace BeB\Webhooks\Actions\Discussion;

use Flarum\Discussion\Discussion;
use Flarum\Extension\ExtensionManager;
use Flarum\User\Guest;
use BeB\Webhooks\Models\Webhook;

abstract class Action extends \BeB\Webhooks\Action
{
    public function ignore(Webhook $webhook, $event): bool
    {
        /**
         * @var Discussion $discussion
         */
        $discussion = $event->discussion;
        $post = $discussion->firstPost ?? $discussion->posts()->where('number', 1)->first();

        if ($webhook->asGuest() && $post && !$post->isVisibleTo(new Guest())) {
            return true;
        }

        $tagIds = $webhook->tag_id;
        $tagsIsEnabled = resolve(ExtensionManager::class)->isEnabled('flarum-tags');

        /** @phpstan-ignore-next-line */
        if (!empty($tagIds) && $tagsIsEnabled && !$discussion->tags()->whereIn('id', $webhook->tag_id)->exists()) {
            return true;
        }

        return false;
    }
}
