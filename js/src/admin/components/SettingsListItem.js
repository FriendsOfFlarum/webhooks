import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';

import tagsLabel from 'flarum/tags/common/helpers/tagsLabel';
import TagSelectionModal from 'flarum/tags/common/components/TagSelectionModal';

import WebhookEditModal from './WebhookEditModal';

export default class SettingsListItem extends Component {
  oninit(vnode) {
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
    const errors = [webhook.error && webhook.error()];

    if (!services[service]) {
      errors.push(app.translator.trans('beb-webhooks.admin.errors.service_not_found', { service }));
    } else if (!webhook.isValid()) {
      errors.push(app.translator.trans('beb-webhooks.admin.errors.url_invalid'));
    } else if (!isTagsEnabled && webhook.tags().length !== 0) {
      errors.push(app.translator.trans('beb-webhooks.admin.errors.tag_disabled'));
    } else if (tags.length !== webhook.attribute('tag_id').length) {
      errors.push(app.translator.trans('beb-webhooks.admin.errors.tag_invalid'));
    }

    const changeTags = () =>
      app.modal.show(TagSelectionModal, {
        selectedTags: tags,
        onsubmit: (tags) => this.update('tag_id')(tags.map((tag) => tag.id())),
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
            placeholder={app.translator.trans('beb-webhooks.admin.settings.help.url')}
          />

          {isTagsEnabled &&
            (tags.length ? (
              tagsLabel(tags, { onclick: changeTags })
            ) : (
              <span className="TagsLabel" onclick={changeTags}>
                {app.translator.trans('beb-webhooks.admin.settings.item.tag_any_label')}
              </span>
            ))}

          <Button
            type="button"
            className="Button Webhook-button"
            icon="fas fa-edit"
            onclick={() =>
              app.modal.show(WebhookEditModal, {
                webhook,
                updateWebhook: this.update('events'),
              })
            }
          />

          <Button type="button" className="Button Button--warning Webhook-button" icon="fas fa-times" onclick={this.delete.bind(this)} />
        </div>

        {!this.events().length && (
          <Alert className="Webhook-error" dismissible={false}>
            {app.translator.trans('beb-webhooks.admin.settings.help.disabled')}
          </Alert>
        )}

        {errors.filter(Boolean).map((error) => (
          <Alert className="Webhook-error" type="error" dismissible={false}>
            {app.translator.trans(error)}
          </Alert>
        ))}
      </div>
    );
  }

  update(field) {
    return (value) => {
      this.loading[field] = true;

      return this.webhook
        .save({
          [field]: value,
        })
        .catch(() => {})
        .then(() => {
          this.loading[field] = false;

          if (this[field]) this[field](value);

          m.redraw();
        });
    };
  }

  delete() {
    return this.webhook.delete().then(() => m.redraw());
  }
}
