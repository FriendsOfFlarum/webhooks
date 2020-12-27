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

namespace FoF\Webhooks;

use Flarum\Http\UrlGenerator;
use FoF\Webhooks\Models\Webhook;
use Symfony\Component\Translation\TranslatorInterface;

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
        $this->url = app(UrlGenerator::class);
        $this->translator = app('translator');
    }

    /**
     * @param $event
     *
     * @return Response
     */
    abstract public function listen($event);

    /**
     * @param $event
     * @param Webhook $webhook
     *
     * @return bool
     */
    public function ignore($event, Webhook $webhook): bool
    {
        return false;
    }

    /**
     * @param string $id
     * @param $param1
     *
     * @return string
     */
    protected function translate(string $id, $param1 = null)
    {
        return $this->translator->trans('fof-webhooks.actions.'.$id, [
            '{1}' => $param1,
        ]);
    }
}
