import app from 'flarum/admin/app';
import Switch from 'flarum/common/components/Switch';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import Icon from 'flarum/common/components/Icon';
import Group from 'flarum/common/models/Group';
import Stream from 'flarum/common/utils/Stream';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Webhook from '../models/Webhook';
import Form from 'flarum/common/components/Form';

export const sortByProp =
  <T extends any>(prop: keyof T) =>
  (a: T, b: T) => {
    const propA = String(a[prop]).toUpperCase(); // ignore upper and lowercase
    const propB = String(b[prop]).toUpperCase(); // ignore upper and lowercase

    return propA < propB ? -1 : propA > propB ? 1 : 0;
  };

export const groupBy = <K extends any>(obj: Record<string, K>, fn: keyof K | ((item: string) => string)): Record<string, Record<string, K>> => {
  const keys = Object.keys(obj);
  const vals = Object.values(obj);

  return keys
    .map(typeof fn === 'function' ? fn : (val: string) => obj[val][fn] as string)
    .reduce((acc: Record<string, Record<string, K>>, val, i) => {
      if (!acc[val]) acc[val] = {};
      acc[val][keys[i]] = vals[i];
      return acc;
    }, {});
};

export const GROUP_ICONS = {
  2: 'fas fa-globe',
  3: 'fas fa-user',
};

export interface WebhookEditModalAttrs extends IFormModalAttrs {
  webhook: Webhook;
  updateWebhook: Function;
}

export default class WebhookEditModal extends FormModal<WebhookEditModalAttrs> {
  protected loadingEvents: string | false = false;

  webhook!: Webhook;

  groupId: Stream<number>;
  extraText: Stream<string>;
  name: Stream<string>;
  usePlainText: Stream<boolean>;
  maxPostContentLength: Stream<number>;
  includeTags: Stream<boolean>;

  events!: Record<
    string | 'other',
    Record<
      string,
      {
        full: string;
        name: string;
      }[]
    >
  >;

  oninit(vnode) {
    super.oninit(vnode);

    this.webhook = this.attrs.webhook;

    const events = app.data['fof-webhooks.events'] as string[];

    this.groupId = Stream(this.webhook.groupId() || Group.GUEST_ID);
    this.extraText = Stream(this.webhook.extraText() || '');
    this.name = Stream(this.webhook.name() || '');
    this.usePlainText = Stream(this.webhook.usePlainText());
    this.maxPostContentLength = Stream(this.webhook.maxPostContentLength());
    this.includeTags = Stream(this.webhook.includeTags());

    this.events = groupBy(
      events.reduce(
        (obj, evt) => {
          const m = /((?:[a-z]\\?)+?)\\Events?\\([a-z]+)/i.exec(evt);

          const data = {
            full: evt,
            name: m?.[2] ?? evt,
          };

          if (!m) {
            obj.other.push(data);
            obj.other = obj.other.sort();
            return obj;
          }

          const group = m[1].toLowerCase().replaceAll('\\', '.');

          if (!obj[group]) obj[group] = [];

          obj[group] = obj[group].concat(data).sort();

          return obj;
        },
        { other: [] } as Record<string, (typeof this.events)['group']['eventname']>
      ),
      (key) => key.split('.')[0]
    );
  }

  className() {
    return 'Modal--medium';
  }

  title() {
    return app.translator.trans('fof-webhooks.admin.settings.modal.title');
  }

  content() {
    const group = app.store.getById<Group>('groups', this.groupId()) as Group;
    const isFilteringTags = !!this.webhook.tags()?.length;

    return (
      <div className="FofWebhooksModal Modal-body">
        <Form>
          <Switch state={this.usePlainText()} onchange={this.usePlainText}>
            {app.translator.trans('fof-webhooks.admin.settings.modal.use_plain_text_label')}
          </Switch>

          <div className="Form-group">
            <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.max_post_content_length_label')}</label>

            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.max_post_content_length_help')}</p>

            <input type="number" min="0" className="FormControl" bidi={this.maxPostContentLength} onkeypress={this.onkeypress.bind(this)} />
          </div>

          <div className="Form-group hasLoading">
            <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_label')}</label>

            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_help')}</p>

            <input type="text" className="FormControl" bidi={this.extraText} onkeypress={this.onkeypress.bind(this)} />
          </div>

          <div className="Form-group">
            <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.name_label')}</label>

            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.name_help')}</p>

            <input
              type="text"
              className="FormControl"
              bidi={this.name}
              placeholder={app.forum.attribute('title')}
              onkeypress={this.onkeypress.bind(this)}
            />
          </div>

          <div className="Form-group">
            <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.group_label')}</label>
            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.group_help')}</p>

            <Dropdown label={[<Icon name={group.icon() || GROUP_ICONS[group.id()!]} />, group.namePlural()]} buttonClassName="Button Button--danger">
              {app.store
                .all<Group>('groups')
                .filter((g) => ['1', '2'].includes(g.id()!))
                .map((g) => (
                  <Button
                    active={group.id() === g.id()}
                    disabled={group.id() === g.id()}
                    icon={g.icon() || GROUP_ICONS[g.id()]}
                    onclick={() => this.groupId(g.id())}
                    type="button"
                  >
                    {g.namePlural()}
                  </Button>
                ))}
            </Dropdown>
          </div>

          <div className="Form-group Webhook-events">
            <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.events_label')}</label>
            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.description')}</p>
            {this.webhook.service() !== 'microsoft-teams' && (
              <div style={{ marginTop: '15px' }}>
                <Switch state={this.includeTags()} onchange={this.includeTags} disabled={!isFilteringTags}>
                  {app.translator.trans('fof-webhooks.admin.settings.modal.include_matching_tags_label')}
                </Switch>
              </div>
            )}
            {Object.entries(this.events).map(([, events]) => (
              <div>
                {Object.entries(events)
                  .sort(sortByProp(0))
                  .map(([group, events]) =>
                    events.length ? (
                      <div>
                        <h3>{this.translate(group)}</h3>
                        {events.map((event) => (
                          <Switch
                            state={this.webhook.events().includes(event.full)}
                            disabled={!!this.loadingEvents}
                            loading={this.loadingEvents === event.full}
                            onchange={this.updateEvents.bind(this, event.full)}
                          >
                            {this.translate(group, event.name.toLowerCase())}
                          </Switch>
                        ))}
                      </div>
                    ) : null
                  )}
              </div>
            ))}
          </div>

          <div className="Form-group">
            <Button type="submit" className="Button Button--primary" loading={this.loading} disabled={!this.isDirty()}>
              {app.translator.trans('core.admin.settings.submit_button')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  translate(group: string, key = 'title') {
    return app.translator.trans(`fof-webhooks.admin.settings.actions.${group}.${key}`);
  }

  isDirty() {
    return (
      this.extraText() != this.webhook.extraText() ||
      this.groupId() !== this.webhook.groupId() ||
      this.usePlainText() !== this.webhook.usePlainText() ||
      this.includeTags() !== this.webhook.includeTags() ||
      this.maxPostContentLength() != this.webhook.maxPostContentLength() ||
      this.name() != this.webhook.name()
    );
  }

  async onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    try {
      await this.webhook.save({
        extraText: this.extraText(),
        groupId: this.groupId(),
        usePlainText: this.usePlainText(),
        includeTags: this.includeTags(),
        maxPostContentLength: this.maxPostContentLength() || 0,
        name: this.name(),
      });
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  onkeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsubmit(e);
    }
  }

  updateEvents(event: string, checked: boolean) {
    this.loadingEvents = event;

    let events = [...this.webhook.events()];

    if (checked) {
      events.push(event);
    } else {
      events.splice(events.indexOf(event), 1);
    }

    return this.attrs.updateWebhook(events).finally(() => {
      this.loadingEvents = false;
      m.redraw();
    });
  }
}
