<?php
/**
 *  This file is part of reflar/webhooks.
 *
 *  Copyright (c) ReFlar.
 *
 *  https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks;

use Flarum\Http\UrlGenerator;
use Flarum\User\User;

class Response
{

    /**
     * @var String
     */
    public $title;

    /**
     * @var String
     */
    public $url;

    /**
     * @var String
     */
    public $description;

    /**
     * @var String
     */
    public $color;

    /**
     * @var User
     */
    public $author;

    /**
     * @var UrlGenerator
     */
    private $urlGenerator;

    /**
     * Response constructor.
     * @param String $title
     * @param String $url
     * @param String $description
     * @param User $author
     */
    public function __construct(String $title = null, String $url = null, String $description = null, User $author = null)
    {
        $this->title = $title;
        $this->url = $url;
        $this->description = $description ?: "";
        $this->author = $author;

        $this->urlGenerator = app(UrlGenerator::class);
    }

    /**
     * @param String $title
     * @return $this
     */
    public function setTitle(String $title) {
        $this->title = $title;
        return $this;
    }

    /**
     * @param string $nameOrUrl
     * @param array|null $data (optional)
     * @return $this
     */
    public function setURL(string $nameOrUrl, $data) {
        $url = isset($data) ? $this->urlGenerator->to('forum')->route($nameOrUrl, $data) : $nameOrUrl;

        $this->url = $url;
        return $this;
    }

    /**
     * @param String $description
     * @return $this
     */
    public function setDescription(String $description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @param User $author
     * @return $this
     */
    public function setAuthor(User $author) {
        $this->author = $author;
        return $this;
    }

    /**
     * Set color
     * @param String $color
     * @return Response
     */
    public function setColor(String $color) {
        $this->color = $color;
        return $this;
    }

    public function getColor() {
        return $this->color ? hexdec(substr($this->color, 1)) : null;
    }


    public static function build() {
        return new Response();
    }

    /**
     * @return String
     */
    public function getAuthorUrl() {
        return $this->urlGenerator->to('forum')->route('user', [
            'username' => $this->author->username,
        ]);
    }
}
