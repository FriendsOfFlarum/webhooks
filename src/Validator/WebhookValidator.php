<?php

namespace BeB\Webhooks\Validator;

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
        'tag_id' => [
            'nullable',
            'array',
            'exists:tags,id',
        ],
    ];
}
