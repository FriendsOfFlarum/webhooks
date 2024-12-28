<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Adapters\Discord;

use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;

class DiscordException extends Exception
{
    private $http;
    private $url;

    /**
     * Exception constructor.
     *
     * @param ResponseInterface $res
     * @param string            $url
     */
    public function __construct(ResponseInterface $res, string $url)
    {
        $this->http = $res->getStatusCode();
        $this->url = $url;

        $contents = $res->getBody()->getContents();
        $body = json_decode($contents);
        $message = Arr::get($body, 'message') ?: $res->getReasonPhrase();

        if (!Arr::get($body, 'message')) {
            $message .= ": $contents";
        }

        parent::__construct(
            $message,
            Arr::get($body, 'code')
        );
    }

    public function __toString()
    {
        return "HTTP $this->http – $this->code $this->message ($this->url)";
    }
}
