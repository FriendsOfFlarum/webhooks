import app from 'flarum/admin/app';
import Model from 'flarum/common/Model';

export default class Webhook extends Model {
  service = Model.attribute<string>('service');
  url = Model.attribute<string>('url');

  error = Model.attribute<string | undefined>('error');
  events = Model.attribute<string[]>('events');

  tagId = Model.attribute<string[]>('tagId');

  groupId = Model.attribute<string | null>('groupId');
  extraText = Model.attribute<string | null>('extraText');
  name = Model.attribute<string | null>('name');

  isValid = Model.attribute<boolean>('isValid', Boolean);

  usePlainText = Model.attribute<boolean>('usePlainText', Boolean);
  maxPostContentLength = Model.attribute<boolean>('maxPostContentLength');

  includeTags = Model.attribute<boolean>('includeTags', Boolean);

  tags() {
    return this.tagId().map((id) => app.store.getById('tags', id));
  }
}
