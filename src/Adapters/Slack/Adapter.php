<?php

namespace BeB\Webhooks\Adapters\Slack;

use Beb\Webhooks\Response;

class Adapter extends \Beb\Webhooks\Adapters\Adapter
{
    /**
     * {@inheritdoc}
     */
    const NAME = 'slack';

    /**
     * {@inheritdoc}
     */
    protected $exception = SlackException::class;

    /**
     * Sends a message through the webhook.
     *
     * @param string   $url
     * @param Response $response
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws SlackException
     */
    public function send(string $url, Response $response)
    {
        $title = $this->settings->get('forum_title');

        $res = $this->request($url, [
            'username'    => $title,
            'avatar_url'  => $this->getAvatarUrl(),
            'text'        => $response->getExtraText(),
            'attachments' => [
                $this->toArray($response),
            ],
        ]);

        if ($res->getStatusCode() == 302) {
            throw new SlackException($res, $url);
        }
    }

    /**
     * @param Response $response
     *
     * @return array
     */
    public function toArray(Response $response): array
    {
        $data = [
            'fallback'   => $response->description.($response->author->exists ? ' - '.$response->author->display_name : ''),
            'color'      => $response->color,
            'title'      => $response->title,
            'title_link' => $response->url,
            'text'       => $response->description,
            'footer'     => $this->settings->get('forum_title'),
        ];

        if ($response->author->exists) {
            $data['author_name'] = $response->author->display_name;
            $data['author_link'] = $response->getAuthorUrl();
            $data['author_icon'] = $response->author->avatar_url;
        }

        return $data;
    }

    /**
     * @param string $url
     *
     * @return bool
     */
    public static function isValidURL(string $url): bool
    {
        // allow any URL as multiple services support Slack webhook payloads
        return true;
    }
}
