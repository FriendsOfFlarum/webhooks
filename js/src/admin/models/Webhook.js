import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

const transformJSON = def => str => str ? JSON.parse(str) : def;

export default class Webhook extends mixin(Model, {
    id: Model.attribute('id'),
    service: Model.attribute('service'),
    url: Model.attribute('url'),
    error: Model.attribute('error'),
    events: Model.attribute('events', transformJSON([])),
}) {}
