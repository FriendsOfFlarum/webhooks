import app from 'flarum/admin/app';
import Model from 'flarum/common/Model';

export default class Webhook extends Model {
  // id = Model.attribute('id');
  service = Model.attribute<string>('service');
  url = Model.attribute<string>('url');

  error = Model.attribute<string | undefined>('error');
  events = Model.attribute<string[]>('events');

  tagIds = Model.attribute<string[]>('tagId');

  groupId = Model.attribute<string | null>('groupId');
  extraText = Model.attribute<string | null>('extraText');
  name = Model.attribute<string | null>('name');

  isValid = Model.attribute<boolean>('isValid', Boolean);

  usePlainText = Model.attribute<boolean>('usePlainText', Boolean);
  maxPostContentLength = Model.attribute<boolean>('maxPostContentLength');

  includeTags = Model.attribute<boolean>('includeTags', Boolean);

  tags() {
    return this.tagIds().map((id) => app.store.getById('tags', id));
  }
}
