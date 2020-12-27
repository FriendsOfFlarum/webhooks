import Model from 'flarum/common/Model';
import mixin from 'flarum/common/utils/mixin';

export default class Webhook extends mixin(Model, {
    id: Model.attribute('id'),
    service: Model.attribute('service'),
    url: Model.attribute('url'),
    error: Model.attribute('error'),
    events: Model.attribute('events'),

    tagId: Model.attribute('tag_id'),

    groupId: Model.attribute('group_id'),
    extraText: Model.attribute('extra_text'),

    isValid: Model.attribute('is_valid', Boolean),
}) {
    apiEndpoint() {
        return `/fof/webhooks${this.exists ? `/${this.data.id}` : ''}`;
    }

    tag() {
        return app.store.getById('tags', this.tagId());
    }
}
