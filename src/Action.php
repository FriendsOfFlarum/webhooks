<?php

/**
 *  This file is part of reflar/webhooks.
 *
 *  Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks;


use Flarum\Http\UrlGenerator;
use Symfony\Component\Translation\TranslatorInterface;

abstract class Action
{
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
     * @return Response
     */
    abstract function listen($event);

    protected function translate(string $id, $param1) {
        return $this->translator->trans("reflar-webhooks.actions." . $id, [
            '{1}' => $param1,
        ]);
    }
}