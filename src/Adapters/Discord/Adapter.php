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

namespace FoF\Webhooks\Adapters\Discord;

use FoF\Webhooks\Response;

class Adapter extends \FoF\Webhooks\Adapters\Adapter
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

        $title = $this->settings->get('forum_title');

        if (strlen($title) > 32) {
            $title = substr($title, 0, 29).'...';
        }

        $this->request($url, [
            'username'   => $title,
            'content'    => $response->getExtraText(),
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
    public function toArray(Response $response): array
    {
        return [
            'title'       => substr($response->title, 0, 256),
            'url'         => $response->url,
            'description' => $response->description ? substr($response->description, 0, 2048) : null,
            'author'      => isset($response->author) ? [
                'name'     => substr($response->author->display_name, 0, 256),
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
        return preg_match('/^https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/api\/webhooks\/\d+?\/.+$/', $url);
    }
}
