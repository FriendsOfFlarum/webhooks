<?php

/*
 * This file is part of fof/webhooks.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

// Removes foreign key constraint for tag_id column that existed in previous versions of the extension.
// Deleting the index is also necessary to prevent errors when changing the column type to JSON in the next migration.
return [
    'up' => static function (Builder $schema) {
        $schema->table('webhooks', function (Blueprint $table) use ($schema) {
            $indexes = $schema->getConnection()->getDoctrineSchemaManager()->listTableIndexes($table->getTable());

            /**
             * @var \Doctrine\DBAL\Schema\Index $index
             */
            $index = collect($indexes)->first(function ($index) {
                return in_array('tag_id', $index->getColumns(), true);
            });

            if ($index) {
                $table->dropForeign(['tag_id']);
                $table->dropIndex($index->getName());
            }
        });
    },
    'down' => static function (Builder $schema) {
        //
    },
];
