import type Mithril from 'mithril';

import app from 'flarum/admin/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Alert from 'flarum/common/components/Alert';
import Tooltip from 'flarum/common/components/Tooltip';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';

import tagsLabel from 'ext:flarum/tags/common/helpers/tagsLabel';

import WebhookEditModal from './WebhookEditModal';
import Webhook from '../models/Webhook';
import Tag from 'ext:flarum/tags/common/models/Tag';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export interface SettingsListItemAttrs extends ComponentAttrs {
  webhook: Webhook;
  services: Record<string, string>;
}

export default class SettingsListItem extends Component<SettingsListItemAttrs> {
  webhook!: Webhook;
  services!: Record<string, string>;

  url: Stream<string>;
  service: Stream<string>;
  events: Stream<string[]>;
  error: Stream<string | undefined>;

  loading!: Record<string, boolean>;
  deleting = false;

  oninit(vnode: Mithril.Vnode<SettingsListItemAttrs, this>) {
    super.oninit(vnode);

    this.webhook = this.attrs.webhook;
    this.services = this.attrs.services;

    this.url = Stream(this.webhook.url());
    this.service = Stream(this.webhook.service());
    this.events = Stream(this.webhook.events());
    this.error = Stream(this.webhook.error());

    this.loading = {};
  }

  view() {
    const { webhook, services } = this;
    const isTagsEnabled = app.initializers.has('flarum-tags');
    const tags = webhook.tags().filter(Boolean);

    const service = webhook.service();
    const errors: Mithril.ChildArray = [webhook.error && webhook.error()];

    if (!services[service]) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.service_not_found', { service }));
    } else if (!webhook.isValid()) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.url_invalid'));
    } else if (!isTagsEnabled && webhook.tags().length !== 0) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.tag_disabled'));
    } else if (tags.length !== webhook.tags()?.length) {
      errors.push(app.translator.trans('fof-webhooks.admin.errors.tag_invalid'));
    }

    const changeTags = () =>
      app.modal.show(() => import('ext:flarum/tags/common/components/TagSelectionModal'), {
        selectedTags: tags,
        onsubmit: (tags: Tag[]) => this.update('tagId')(tags.map((tag) => tag.id()!)),
      });

    return (
      <div className="Webhooks--row" data-webhook-id={webhook.id()}>
        <div className="Webhook-input">
          <Select options={services} value={service} onchange={this.update('service')} disabled={this.loading['service']} />

          <input
            className="FormControl Webhook-url"
            type="url"
            value={this.url()}
            onchange={withAttr('value', this.update('url'))}
            disabled={this.loading['url']}
            placeholder={app.translator.trans('fof-webhooks.admin.settings.help.url')}
          />

          {isTagsEnabled && (
            <Tooltip text={app.translator.trans('fof-webhooks.admin.settings.item.edit_tags_button')}>
              <Button className="Button" onclick={changeTags}>
                {tags.length ? (
                  tagsLabel(tags, { onclick: changeTags })
                ) : (
                  <span className="TagsLabel" onclick={changeTags}>
                    {app.translator.trans('fof-webhooks.admin.settings.item.tag_any_label')}
                  </span>
                )}
              </Button>
            </Tooltip>
          )}

          <Tooltip text={app.translator.trans('fof-webhooks.admin.settings.item.edit_tooltip')}>
            <Button
              type="button"
              className="Button Button--icon Webhook-button"
              icon="fas fa-edit"
              onclick={() =>
                app.modal.show(WebhookEditModal, {
                  webhook,
                  updateWebhook: this.update('events'),
                })
              }
            />
          </Tooltip>

          <Tooltip text={app.translator.trans('fof-webhooks.admin.settings.item.delete_tooltip')}>
            <Button
              type="button"
              className="Button Button--danger Button--icon Webhook-button"
              icon="fas fa-times"
              loading={this.deleting}
              onclick={this.delete.bind(this)}
            />
          </Tooltip>
          <span />
        </div>

        {!this.events().length && (
          <Alert className="Webhook-error" dismissible={false}>
            {app.translator.trans('fof-webhooks.admin.settings.help.disabled')}
          </Alert>
        )}

        {errors.filter(Boolean).map((error) => (
          <Alert className="Webhook-error" type="error" dismissible={false}>
            {typeof error === 'string' ? app.translator.trans(error) : error}
          </Alert>
        ))}
      </div>
    );
  }

  update<T extends FunctionKeys<Webhook>>(field: T) {
    return async (value: ReturnType<Webhook[T]>) => {
      this.loading[field] = true;

      try {
        await this.webhook.save({
          [field]: value,
        });
      } finally {
        this.loading[field] = false;

        if (field in this) {
          (this as any)[field](value);
        }

        m.redraw();
      }
    };
  }

  async delete() {
    this.deleting = true;

    const service = this.services[this.webhook.service()] ?? this.webhook.service();
    const confirmText = app.translator.trans('fof-webhooks.admin.settings.item.delete_confirm_alert', { service }, true);

    try {
      if (confirm(confirmText)) {
        return await this.webhook.delete();
      }
    } finally {
      this.deleting = false;
      m.redraw();
    }
  }
}
