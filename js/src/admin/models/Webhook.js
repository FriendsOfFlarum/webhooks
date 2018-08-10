import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class Webhook extends mixin(Model, {
    id: Model.attribute('id'),
    service: Model.attribute('service'),
    url: Model.attribute('url'),
    error: Model.attribute('error'),
}) {}
