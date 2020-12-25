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

namespace FoF\Webhooks\Adapters\Slack;

use Exception;
use Psr\Http\Message\ResponseInterface;

class SlackException extends Exception
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

        if ($this->http == 302) {
            $this->http = 404;
        }

        $contents = $res->getBody()->getContents();
        $body = json_decode($contents);

        if ($this->http == 404) {
            parent::__construct(app('translator')->trans('fof-webhooks.adapters.errors.404'));
        } else {
            parent::__construct($body->message ?: $contents, $body->code);
        }
    }

    public function __toString()
    {
        $code = $this->code;
        $message = $code ? "$code $this->message" : $this->message;

        return "HTTP $this->http – $message ($this->url)";
    }
}
