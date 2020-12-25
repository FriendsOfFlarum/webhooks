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

namespace FoF\Webhooks\Adapters;

use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Webhooks\Models\Webhook;
use FoF\Webhooks\Response;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use ReflectionClass;
use ReflectionException;
use Throwable;

abstract class Adapter
{
    /**
     * Adapter name.
     *
     * @var string
     */
    const NAME = null;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Client
     */
    protected $client;

    /**
     * Exception to use on request errors.
     *
     * @var \Exception
     */
    protected $exception;

    /**
     * Set up the class.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;

        $this->client = new Client();
    }

    /**
     * @param Webhook  $webhook
     * @param Response $response
     *
     * @throws ReflectionException
     */
    public function handle(Webhook $webhook, Response $response)
    {
        try {
            $this->send($webhook->url, $response);

            if (isset($webhook->error)) {
                $webhook->setAttribute('error', null);
            }
        } catch (RequestException $e) {
            $clazz = new ReflectionClass($this->exception);

            app('log')->error(self::NAME.' Webhook Error:');
            app('log')->error("\t— $response");

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
        } catch (Throwable $e) {
            $webhook->setAttribute(
                'error',
                $e instanceof $this->exception ? $e : $e->getMessage()
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
    abstract public static function isValidURL(string $url): bool;

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
        return $this->client->request('POST', $url, [
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
