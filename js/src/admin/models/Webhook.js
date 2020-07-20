import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

const transformJSON = (def) => (str) => (str && typeof str === 'string' ? JSON.parse(str) : def);

export default class Webhook extends mixin(Model, {
    id: Model.attribute('id'),
    service: Model.attribute('service'),
    url: Model.attribute('url'),
    error: Model.attribute('error'),
    events: Model.attribute('events', transformJSON([])),
    groupId: Model.attribute('group_id'),

    extraText: Model.attribute('extra_text'),

    isValid: Model.attribute('is_valid', Boolean),
}) {
    apiEndpoint() {
        return `/reflar/webhooks${this.exists ? `/${this.data.id}` : ''}`;
    }
}
