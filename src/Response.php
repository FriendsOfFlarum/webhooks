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

namespace FoF\Webhooks;

use Carbon\Carbon;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;
use FoF\Webhooks\Models\Webhook;

class Response
{
    /**
     * @var string
     */
    public $title;

    /**
     * @var string
     */
    public $url;

    /**
     * @var string
     */
    public $description;

    /**
     * @var string
     */
    public $color;

    /**
     * @var string
     */
    public $timestamp;

    /**
     * @var User
     */
    public $author;

    public $event;

    /**
     * @var UrlGenerator
     */
    private $urlGenerator;

    /**
     * @var Webhook
     */
    protected $webhook;

    /**
     * Response constructor.
     *
     * @param $event
     */
    public function __construct($event)
    {
        $this->event = $event;
        $this->urlGenerator = app(UrlGenerator::class);
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function setURL(string $name, array $data = null, ?string $extra = null): self
    {
        $url = $this->urlGenerator->to('forum')->route($name, $data);

        if (isset($extra)) {
            $url = $url.$extra;
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

    public function getColor()
    {
        return $this->color ? hexdec(substr($this->color, 1)) : null;
    }

    public static function build($event): self
    {
        return new self($event);
    }

    public function getAuthorUrl(): ?string
    {
        return $this->author ? $this->urlGenerator->to('forum')->route('user', [
            'username' => $this->author->username,
        ]) : null;
    }

    public function getExtraText(): ?string
    {
        return $this->webhook->extra_text;
    }

    public function withWebhook(Webhook $webhook): self
    {
        $clone = clone $this;

        $clone->setWebhook($webhook);

        return $clone;
    }

    protected function setWebhook(Webhook $webhook)
    {
        $this->webhook = $webhook;
    }

    public function __toString()
    {
        return "Response{title=$this->title,url=$this->url,author={$this->author->display_name}}";
    }
}
