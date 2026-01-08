<?php

namespace FoF\Webhooks\Api;

use Flarum\Api\Endpoint;
use Flarum\Api\Schema;
use Flarum\Api\Resource\AbstractDatabaseResource;
use FoF\Webhooks\Models\Webhook;
use Tobyz\JsonApiServer\Context;

/** @extends AbstractDatabaseResource<Webhook> */
class WebhookResource extends AbstractDatabaseResource
{

    public function model(): string
    {
        return Webhook::class;
    }

    public function type(): string
    {
        return 'fof-webhooks';
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('service')->writable()->requiredOnCreate(),
            Schema\Str::make('url')->rule('url')->writable()->requiredOnCreate(),
            Schema\Str::make('error'),

            Schema\Attribute::make('events')
                ->get(fn(Webhook $model) => json_decode($model->events) ?: [])
                ->set(fn(Webhook $model, $value) => $model->events = json_encode($value))
                ->writable(),

            Schema\Number::make('groupId')->rule('in:1,2')->nullable()->writable(),
            Schema\Arr::make('tagId')->rule('exists:tags,id')->nullable()->writable(),
            Schema\Str::make('extraText')->default('')->nullable()->writable(),
            Schema\Str::make('name')->default('')->nullable()->writable(),

            Schema\Boolean::make('usePlainText')->default(false)->writable(),
            Schema\Boolean::make('includeTags')->default(false)->writable(),
            Schema\Number::make('maxPostContentLength')->min(0)->nullable()->writable(),

            Schema\Boolean::make('isValid')
                ->get(fn(Webhook $model) => $model->isValid()),
        ];
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()
                ->admin(),

            Endpoint\Create::make()
                ->admin(),

            Endpoint\Update::make()
                ->admin(),

            Endpoint\Delete::make()
                ->admin(),
        ];
    }

    public function creating(object $model, Context $context): ?object
    {
        $model->events = '[]';

        return $model;
    }
}
