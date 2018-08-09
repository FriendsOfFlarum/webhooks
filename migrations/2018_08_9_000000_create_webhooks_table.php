<?php

/**
 *  This file is part of reflar/webhooks
 *
 *  Copyright (c) ReFlar.
 *
 *  http://reflar.io
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable(
    'webhooks',
    function (Blueprint $table) {
        $table->increments('id');
        $table->string('service');
        $table->string('url');
    }
);