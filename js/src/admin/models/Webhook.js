import app from 'flarum/admin/app';
import Model from 'flarum/common/Model';

export default class Webhook extends Model {
  id = Model.attribute('id');
  service = Model.attribute('service');
  url = Model.attribute('url');

  error = Model.attribute('error');
  events = Model.attribute('events');

  tagIds = Model.attribute('tag_id');

  groupId = Model.attribute('group_id');
  extraText = Model.attribute('extra_text');

  isValid = Model.attribute('is_valid', Boolean);

  usePlainText = Model.attribute('use_plain_text', Boolean);
  maxPostContentLength = Model.attribute('max_post_content_length');

  apiEndpoint() {
    return `/fof/webhooks${this.exists ? `/${this.data.id}` : ''}`;
  }

  tags() {
    return this.tagIds().map((id) => app.store.getById('tags', id));
  }
}
