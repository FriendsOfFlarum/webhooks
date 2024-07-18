<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks\Adapters\Telegram;

use FoF\Webhooks\Response;

class Adapter extends \FoF\Webhooks\Adapters\Adapter
{
    /**
     * {@inheritdoc}
     */
    const NAME = 'telegram';

    /**
     * {@inheritdoc}
     */
    protected $exception = TelegramException::class;

    /**
     * Sends a message through the webhook.
     *
     * @param string   $url
     * @param Response $response
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws TelegramException
     */
  public function send(string $telegramBotUrl, Response $response)
  {
      try {
        // Extract necessary information from the response object
          $title = $response->title;
          $description = $response->description;
          $forumUrl = $response->url;
          $authorId = $response->author->id;
          $authorUsername = $response->author->username;
          $discussionTitle = $response->event->post->discussion->title;

          // Get the field ID for the custom field (hardcode this if it's fixed, or fetch it dynamically if needed)
          $fieldId = 1;

          // Retrieve the user's chat_id from the masquerade answers table
          $chatId = \Flarum\Db\Database::table('flarfof_masquerade_answers')
            ->where('user_id', $authorId)
            ->where('field_id', $fieldId)
            ->value('content');

          if (!$chatId) {
            throw new \Exception("Telegram chat_id not found for user ID: {$authorId}");
          }

          // Constructing the message
          $message = "Message from: \"{$authorUsername}\"" . PHP_EOL;
          $message .= "In: \"{$discussionTitle}\"" . PHP_EOL;
          $message .= "Text: \"{$description}\"" . PHP_EOL;

          // URL Button
          $keyboard = [
            'inline_keyboard' => [
              [
                [
                  'text' => 'Go to Forum',
                  'url' => $forumUrl,
                ],
              ],
            ],
          ];

          // Convert keyboard array to JSON
          $replyMarkup = json_encode($keyboard);

          // Send the message with URL button to Telegram
          $res = $this->request($telegramBotUrl, [
              'text' => $message,
              'chat_id' => $chatId,
              'reply_markup' => $replyMarkup,
          ]);

          // Logging for debugging
          error_log("Message to Telegram: " . $message);
          error_log("Telegram API Response: " . json_encode($res->getBody()->getContents()));

          if ($res->getStatusCode() != 200) {
              throw new \Exception("Failed to send message to Telegram. Status code: {$res->getStatusCode()}");
          }
      } catch (\Exception $e) {
          error_log("Error sending message to Telegram: " . $e->getMessage());
          throw $e;
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
        // allow any URL as multiple services support Telegram webhook payloads
        return true;
    }
}
