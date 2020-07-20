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

namespace Reflar\Webhooks\Adapters\MicrosoftTeams;

use Exception;
use Psr\Http\Message\ResponseInterface;

class TeamsException extends Exception
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

        $error = $res->getBody()->getContents();

        parent::__construct($error ?: $res->getReasonPhrase());
    }

    public function __toString()
    {
        return "HTTP $this->http – $this->message ($this->url)";
    }
}
