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

namespace Reflar\Webhooks\Adapters\Discord;

use Exception;
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

        if (!array_get($body, 'message')) {
            app('log')->error('Discord Webhook Error: '.$contents);
        }

        parent::__construct(
            array_get($body, 'message') ?: $res->getReasonPhrase(),
            array_get($body, 'code')
        );
    }

    public function __toString()
    {
        return "HTTP $this->http – $this->code $this->message ($this->url)";
    }
}
