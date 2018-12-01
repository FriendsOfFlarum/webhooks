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
    private static $client;

    /**
     * Exception to use on request errors.
     *
     * @var \Exception
     */
    protected $exception;

    /**
     * Adapter name.
     *
     * @var string
     */
    protected $name;

    /**
     * Set up the class.
     */
    public function __construct()
    {
        $this->settings = app('flarum.settings');

        self::$client = new \GuzzleHttp\Client();
    }

    /**
     * @param Webhook  $webhook
     * @param Response $response
     *
     * @throws \ReflectionException
     */
    public function handle(Webhook $webhook, Response $response)
    {
        try {
            $this->send($webhook->url, $response);
            if (isset($webhook->error)) {
                $webhook->setAttribute('error', null);
            }
        } catch (RequestException $e) {
            $clazz = new \ReflectionClass($this->exception);

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
        } catch (\Throwable $e) {
            $clazz = new \ReflectionClass($this->exception);

            $webhook->setAttribute(
                'error',
                $clazz->isInstance($e) ? $e : $e->getMessage()
            );
        }

        $webhook->save();
    }

    /**
     * Sends a message through the webhook.
     *
     * @param string   $url
     * @param Response $response
     *
     * @throws RequestException
     */
    abstract public function send(string $url, Response $response);

    /**
     * @param Response $response
     *
     * @return array
     */
    abstract public function toArray(Response $response);

    /**
     * @param string $url
     *
     * @return bool
     */
    abstract public function isValidURL(string $url) : bool;

    public function getName()
    {
        assert(isset($this->name), '$name is required');

        return $this->name;
    }

    /**
     * @param string $url
     * @param array  $json
     *
     * @throws GuzzleException
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    protected function request(string $url, array $json)
    {
        return self::$client->request('POST', $url, [
            'json'            => $json,
            'allow_redirects' => false,
        ]);
    }

    /**
     * @return null|string
     */
    protected function getAvatarUrl()
    {
        $faviconPath = $this->settings->get('favicon_path');
        $logoPath = $this->settings->get('logo_path');
        $path = $faviconPath ?: $logoPath;

        return isset($path) ? app(UrlGenerator::class)->to('forum')->path("assets/$path") : null;
    }
}
