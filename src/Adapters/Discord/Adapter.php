<?php

namespace BeB\Webhooks\Adapters\Discord;

use BeB\Webhooks\Response;

class Adapter extends \BeB\Webhooks\Adapters\Adapter
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
            'author'      => $response->author->exists ? [
                'name'     => substr($response->author->display_name, 0, 256),
                'url'      => $response->getAuthorUrl(),
                'icon_url' => $response->author->avatar_url,
            ] : null,
            'color'     => $response->getColor(),
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
