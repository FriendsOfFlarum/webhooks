<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks;

use Carbon\Carbon;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;
use FoF\Webhooks\Models\Webhook;

class Response
{
    public ?string $title;

    public ?string $url;

    public ?string $description;

    public ?string $color;

    public ?string $tags;

    public ?string $timestamp;

    public ?User $author;

    public object $event;

    protected ?Webhook $webhook;

    public function __construct(protected UrlGenerator $urlGenerator)
    {
    }

    public function withEvent($event): self
    {
        $this->event = $event;

        return $this;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function setURL(string $name, ?array $data = null, ?string $extra = null): self
    {
        $url = $this->urlGenerator->to('forum')->route($name, $data);

        if (isset($extra)) {
            $url .= $extra;
        }

        $this->url = $url;

        return $this;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function setAuthor(User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function setTimestamp(?string $timestamp): self
    {
        $this->timestamp = $timestamp ?: Carbon::now();

        return $this;
    }

    public function getColor(): float|int|null
    {
        return $this->color ? hexdec(substr($this->color, 1)) : null;
    }

    public static function build($event): self
    {
        return resolve(self::class)->withEvent($event);
    }

    public function getAuthorUrl(): ?string
    {
        return $this->author->exists ? $this->urlGenerator->to('forum')->route('user', [
            'username' => $this->author->username,
        ]) : null;
    }

    public function getExtraText(): ?string
    {
        return $this->webhook->extra_text;
    }

    public function getIncludeTags(): bool
    {
        return $this->webhook->include_tags;
    }

    public function getTags(): ?array
    {
        return $this->webhook->appliedTags();
    }

    public function getWebhookName(): ?string
    {
        return $this->webhook->name;
    }

    public function withWebhook(Webhook $webhook): self
    {
        $this->setWebhook($webhook);

        return $this;
    }

    protected function setWebhook(Webhook $webhook): void
    {
        $this->webhook = $webhook;
    }

    public function __toString()
    {
        return "Response{title=$this->title,url=$this->url,author={$this->author->display_name}}";
    }
}
