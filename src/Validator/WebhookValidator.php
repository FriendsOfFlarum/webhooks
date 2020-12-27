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

namespace FoF\Webhooks\Validator;

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
        ],
        'group_id' => [
            'nullable',
            'int',
            'in:1,2',
        ],
    ];
}
