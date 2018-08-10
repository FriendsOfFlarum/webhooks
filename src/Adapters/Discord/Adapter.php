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


use Flarum\Http\UrlGenerator;
use Reflar\Webhooks\Response;

class Adapter extends \Reflar\Webhooks\Adapters\Adapter
{
    public static $client;

    protected $exception = DiscordException::class;

    /**
     * Sends a message through the webhook
     * @param string $url
     * @param Response $response
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function send(string $url, Response $response) {
        if (!isset($response)) return;

        $this->request($url, [
            "username" => $this->settings->get('reflar-webhooks.settings.discordName') ?: $this->settings->get('forum_title'),
            "avatar_url" => $this->getAvatarUrl(),
            "embeds" => [
                $this->toArray($response)
            ]
        ]);
    }

    /**
     * @return null|string
     */
    protected function getAvatarUrl() {
        $faviconPath = $this->settings->get('favicon_path');
        $logoPath = $this->settings->get('logo_path');

        return ($faviconPath ?: $logoPath) ? app(UrlGenerator::class)->to('forum')->path('assets/' . ($faviconPath ?: $logoPath)) : null;
    }

    /**
     * @param Response $response
     * @return array
     */
    function toArray(Response $response)
    {
        return [
            'title' => substr($response->title, 0, 256),
            'url' => $response->url,
            'description' => $response->description ? substr($response->description, 0, 2048) : null,
            'author' => isset($response->author) ? [
                'name' => substr($response->author->username, 0, 256),
                'url' => $response->getAuthorUrl(),
                'icon_url' => $response->author->avatar_url,
            ] : null,
            'color' => $response->getColor(),
            'timestamp' => isset($response->timestamp) ? $response->timestamp : date("c"),
            'type' => 'rich'
        ];
    }
}