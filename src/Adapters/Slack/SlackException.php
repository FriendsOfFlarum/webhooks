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

namespace Reflar\Webhooks\Adapters\Slack;

use Exception;
use Psr\Http\Message\ResponseInterface;

class SlackException extends Exception
{
    private $http;
    private $url;

    /**
     * Exception constructor.
     * @param ResponseInterface $res
     * @param string $url
     */
    public function __construct(ResponseInterface $res, string $url) {
        $this->http = $res->getStatusCode();
        $this->url = $url;

        $body = json_decode($res->getBody()->getContents());

        parent::__construct($body->message, $body->code);
    }

    public function __toString() {
        return "Slack: HTTP $this->http – $this->code $this->message ($this->url)";
    }
}