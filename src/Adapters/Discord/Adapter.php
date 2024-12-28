<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Adapters\Discord;

use FoF\Webhooks\Response;
use Illuminate\Support\Str;

class Adapter extends \FoF\Webhooks\Adapters\Adapter
{
    /**
     * {@inheritdoc}
     */
    const NAME = 'discord';

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
        $this->request($url, [
            'username'   => Str::limit($this->getTitle($response), 32, '...'),
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
            'author'      => $response->author->exists ? [
                'name'     => substr($response->author->display_name, 0, 256),
                'url'      => $response->getAuthorUrl(),
                'icon_url' => $response->author->avatar_url,
            ] : null,
            'color'         => $response->getColor(),
            'fields'        => $response->getIncludeTags() ? [
                [
                    'name'    => 'Tags',
                    'value'   => implode(', ', $response->getTags()),
                ],
            ] : null,
            'timestamp' => $response->timestamp,
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
