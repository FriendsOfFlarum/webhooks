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

namespace Reflar\Webhooks;

use Carbon\Carbon;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;

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
     * Response constructor.
     *
     * @param $event
     */
    public function __construct($event)
    {
        $this->event = $event;
        $this->urlGenerator = app(UrlGenerator::class);
    }

    /**
     * @param string $title
     *
     * @return $this
     */
    public function setTitle(string $title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @param string      $name
     * @param array|null  $data
     * @param string|null $extra
     *
     * @return $this
     */
    public function setURL(string $name, $data = null, $extra = null)
    {
        $url = $this->urlGenerator->to('forum')->route($name, $data);

        if (isset($extra)) {
            $url = $url.$extra;
        }

        $this->url = $url;

        return $this;
    }

    /**
     * @param string $description
     *
     * @return $this
     */
    public function setDescription(string $description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @param User $author
     *
     * @return $this
     */
    public function setAuthor(User $author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Set color.
     *
     * @param string $color
     *
     * @return Response
     */
    public function setColor(string $color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Set color.
     *
     * @param string $timestamp
     *
     * @return Response
     */
    public function setTimestamp(?string $timestamp)
    {
        $this->timestamp = $timestamp ?: Carbon::now();

        return $this;
    }

    public function getColor()
    {
        return $this->color ? hexdec(substr($this->color, 1)) : null;
    }

    /**
     * @param $event
     *
     * @return Response
     */
    public static function build($event)
    {
        return new self($event);
    }

    /**
     * @return string
     */
    public function getAuthorUrl()
    {
        return $this->author ? $this->urlGenerator->to('forum')->route('user', [
            'username' => $this->author->username,
        ]) : null;
    }

    public function __toString()
    {
        return "Response{title=$this->title,url=$this->url,author={$this->author->username}}";
    }
}
