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

namespace Reflar\Webhooks\Adapters\Discord;

use Exception;

class DiscordException extends Exception
{
    private $http;

    /**
     * Exception constructor.
     * @param int $http
     * @param int $code
     * @param string $message
     */
    public function __construct(int $http, int $code, string $message) {
        $this->http = $http;

        parent::__construct($message, $code, null);
    }

    public function __toString() {
        return "Discord: HTTP $this->http – $this->code $this->message";
    }
}
