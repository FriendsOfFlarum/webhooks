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

namespace Reflar\Webhooks\Validator;

use Flarum\Foundation\AbstractValidator;

class WebhookValidator extends AbstractValidator
{
    protected $rules = [
        'service' => [
            'required',
            'string',
        ],
        'url' => [
            'required',
            'string',
            'url',
            'unique:webhooks',
        ],
    ];
}
