<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Webhooks;

use Flarum\Http\UrlGenerator;
use FoF\Webhooks\Models\Webhook;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @template T
 */
abstract class Action
{
    /**
     * The event class string handled by this action.
     *
     * @type class-string<T>
     */
    public const EVENT = '';

    public function __construct(
        protected UrlGenerator $urlGenerator,
        protected TranslatorInterface $translator
    )
    {
    }

    /**
     * Handle the given event and return a Response to be sent to the webhook.
     *
     * @param Webhook $webhook
     * @param T       $event
     *
     * @return Response|null
     *
     * @abstract
     */
    abstract public function handle(Webhook $webhook, $event): ?Response;

    /**
     * @param Webhook $webhook
     * @param T       $event
     *
     * @return bool
     */
    public function ignore(Webhook $webhook, $event): bool
    {
        return false;
    }

    /**
     * @param string   $id
     * @param string[] $params
     *
     * @return string
     */
    protected function translate(string $id, ...$params): string
    {
        $replacements = [];
        foreach ($params as $i => $param) {
            $replacements['{' . ($i + 1) . '}'] = $param;
        }

        return $this->translator->trans('fof-webhooks.actions.'.$id, $replacements);
    }
}
