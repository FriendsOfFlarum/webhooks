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

use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Reflar\Webhooks\Models\Webhook;
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
     * @var \Exception
     */
    protected $exception;

    /**
     * Set up the class
     */
    public function __construct() {
        $this->settings = app('flarum.settings');

        self::$client = new \GuzzleHttp\Client();
    }

    /**
     * @param Webhook $webhook
     * @param Response $response
     * @throws \ReflectionException
     */
    public function handle(Webhook $webhook, Response $response) {
        $clazz = new \ReflectionClass($this->exception);

        try {
            $this->send($webhook->url, $response);
            if (isset($webhook->error)) $webhook->setAttribute('error', null);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $webhook->setAttribute(
                    'error',
                    $clazz->newInstance($e->getResponse(), $webhook->url)
                );
            } else {
                $webhook->setAttribute(
                    'error',
                    $e->getMessage()
                );
            }
        } catch (\Exception $e) {
            $webhook->setAttribute(
                'error',
                $clazz->isInstance($e) ? $e : $e->getMessage()
            );
        }

        $webhook->save();
    }

    /**
     * Sends a message through the webhook
     * @param string $url
     * @param Response $response
     * @throws RequestException
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
     * @throws GuzzleException
     */
    protected function request(string $url, array $json) {
        return self::$client->request('POST', $url, [
            'json' => $json,
            'allow_redirects' => false
        ]);
    }

    /**
     * @return null|string
     */
    protected function getAvatarUrl() {
        $faviconPath = $this->settings->get('favicon_path');
        $logoPath = $this->settings->get('logo_path');
        $path = $faviconPath ?: $logoPath;

        return isset($path) ? app(UrlGenerator::class)->to('forum')->path("assets/$path") : null;
    }
}