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

abstract class Action
{
    public const EVENT = '';

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    public function __construct()
    {
        $this->url = resolve(UrlGenerator::class);
        $this->translator = resolve(TranslatorInterface::class);
    }

    /**
     * @param $event
     *
     * @return Response|null
     *
     * @deprecated
     */
    public function listen($event): ?Response
    {
        return null;
    }

    /**
     * @param Webhook $webhook
     * @param         $event
     *
     * @return Response|null
     *
     * @abstract
     */
    public function handle(Webhook $webhook, $event): ?Response
    {
        return $this->listen($event);
    }

    /**
     * @param         $event
     * @param Webhook $webhook
     *
     * @return bool
     */
    public function ignore(Webhook $webhook, $event): bool
    {
        return false;
    }

    /**
     * @param string $id
     * @param        $param1
     *
     * @return string
     */
    protected function translate(string $id, $param1 = null): string
    {
        return $this->translator->trans('fof-webhooks.actions.'.$id, [
            '{1}' => $param1,
        ]);
    }
}
