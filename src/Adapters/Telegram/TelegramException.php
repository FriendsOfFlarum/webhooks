<?php

namespace BeB\Webhooks\Adapters\Telegram;

use Exception;
use Psr\Http\Message\ResponseInterface;

class TelegramException extends Exception
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
            parent::__construct(resolve('translator')->trans('beb-webhooks.adapters.errors.404'));
        } else {
            parent::__construct(@$body->message ?? $contents, @$body->code);
        }
    }

    public function __toString()
    {
        $code = $this->code;
        $message = $code ? "$code $this->message" : $this->message;

        return "HTTP $this->http – $message ($this->url)";
    }
}