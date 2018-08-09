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

namespace Reflar\Webhooks\Adapters;

use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Exception\GuzzleException;
use Reflar\Webhooks\Response;

abstract class Adapter
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;


    /**
     * @var \GuzzleHttp\Client
     */
    static $client;

    /**
     * Set up the class
     */
    public function __construct() {
        $this->settings = app('flarum.settings');

        self::$client = new \GuzzleHttp\Client();
    }

    /**
     * Sends a message through the webhook
     * @param string $url
     * @param Response $response
     */
    abstract function send(string $url, Response $response);

    /**
     * @param Response $response
     * @return array
     */
    abstract function toArray(Response $response);

    /**
     * @return bool
     */
    public function matchesFilters() {
        return true;
    }

    /**
     * @param string $url
     * @param array $json
     * @return \Psr\Http\Message\ResponseInterface
     */
    protected function request(string $url, array $json) {
        try {
            return self::$client->request('POST', $url, [
                'json' => $json,
            ]);
        } catch (GuzzleException $e) {
            // TODO: handle request failure
        }
    }
}