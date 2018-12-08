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

namespace Reflar\Webhooks\Adapters\Discord;

use Reflar\Webhooks\Response;

class Adapter extends \Reflar\Webhooks\Adapters\Adapter
{
    /**
     * {@inheritdoc}
     */
    const NAME = 'discord';

    /**
     * {@inheritdoc}
     */
    protected $exception = DiscordException::class;

    /**
     * Sends a message through the webhook.
     *
     * @param string   $url
     * @param Response $response
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function send(string $url, Response $response)
    {
        if (!isset($response)) {
            return;
        }

        $this->request($url, [
            'username'   => $this->settings->get('forum_title'),
            'avatar_url' => $this->getAvatarUrl(),
            'embeds'     => [
                $this->toArray($response),
            ],
        ]);
    }

    /**
     * @param Response $response
     *
     * @return array
     */
    public function toArray(Response $response)
    {
        return [
            'title'       => substr($response->title, 0, 256),
            'url'         => $response->url,
            'description' => $response->description ? substr($response->description, 0, 2048) : null,
            'author'      => isset($response->author) ? [
                'name'     => substr($response->author->username, 0, 256),
                'url'      => $response->getAuthorUrl(),
                'icon_url' => $response->author->avatar_url,
            ] : null,
            'color'     => $response->getColor(),
            'timestamp' => isset($response->timestamp) ? $response->timestamp : date('c'),
            'type'      => 'rich',
        ];
    }

    /**
     * @param string $url
     *
     * @return bool
     */
    public static function isValidURL(string $url): bool
    {
        return preg_match('/^https?:\/\/(?:\w+\.)?discordapp\.com\/api\/webhooks\/\d+?\/.+$/', $url);
    }
}
