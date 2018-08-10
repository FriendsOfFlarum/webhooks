<?php

/**
 *  This file is part of reflar/webhooks
 *
 *  Copyright (c) ReFlar.
 *
 *  https://reflar.redevs.org
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Webhooks\Models;

use Flarum\Database\AbstractModel;

/**
 * @property string service
 * @property string url
 */
class Webhook extends AbstractModel
{
    /**
     * { @inheritdoc }
     */
    protected $table = 'webhooks';

    /**
     * @param string $service
     * @param string $url
     * @return static
     */
    public static function build(string $service, string $url) {
        $webhook = new static;
        $webhook->service = $service;
        $webhook->url = $url;
        return $webhook;
    }

}
