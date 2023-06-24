import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

import SettingsListItem from './SettingsListItem';

export default class WebhooksPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.values = {};
    this.services = app.data['fof-webhooks.services'].reduce((o, service) => {
      o[service] = app.translator.trans(`fof-webhooks.admin.settings.services.${service}`);
      return o;
    }, {});

    this.newWebhook = {
      service: Stream('discord'),
      url: Stream(''),
      loading: Stream(false),
    };

    this.loadingData = Stream(true);
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    Promise.all([app.store.find('fof/webhooks'), this.isTagsEnabled() && app.store.find('tags')]).then(() => {
      this.loadingData(false);
      m.redraw();
    });
  }

  content() {
    const webhooks = app.store.all('webhooks');

    if (this.loadingData()) {
      return <LoadingIndicator />;
    }

    return (
      <div className="WebhookContent">
        <div className="container">
          <div className="Form-group">
            {this.buildSettingComponent({
              type: 'boolean',
              setting: 'fof-webhooks.debug',
              label: app.translator.trans('fof-webhooks.admin.settings.debug_label'),
              help: app.translator.trans('fof-webhooks.admin.settings.debug_help'),
              loading: this.loading,
              onchange: this.updateDebug.bind(this),
            })}
          </div>

          <hr />

          <form>
            <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.help.general')}</p>
            {this.isTagsEnabled() && <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.help.tags')}</p>}
            <fieldset>
              <div className="Webhooks--Container">
                {webhooks.map((webhook) => (
                  <SettingsListItem webhook={webhook} services={this.services} />
                ))}
                <div className="Webhooks--row">
                  <div className="Webhook-input">
                    <Select options={this.services} value={this.newWebhook.service()} onchange={this.newWebhook.service} />

                    <input
                      className="FormControl Webhook-url"
                      type="url"
                      placeholder={app.translator.trans('fof-webhooks.admin.settings.help.url')}
                      onchange={withAttr('value', this.newWebhook.url)}
                      onkeypress={this.onkeypress.bind(this)}
                    />

                    <Button
                      type="button"
                      loading={this.newWebhook.loading()}
                      className="Button Button--warning Webhook-button"
                      icon="fas fa-plus"
                      onclick={this.addWebhook.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }

  addWebhook() {
    if (this.newWebhook.loading()) return;

    this.newWebhook.loading(true);

    return app.store
      .createRecord('webhooks')
      .save({
        service: this.newWebhook.service(),
        url: this.newWebhook.url(),
      })
      .then(() => {
        this.newWebhook.service('discord');
        this.newWebhook.url('');
        this.newWebhook.loading(false);

        m.redraw();
      })
      .catch(() => {
        this.newWebhook.loading(false);

        m.redraw();
      });
  }

  onkeypress(e) {
    if (e.key === 'Enter') {
      this.addWebhook();
    }
  }

  /**
   * @returns boolean
   */
  changed() {
    return this.fields.some((key) => this.values[key]() !== (app.data.settings[this.addPrefix(key)] || ''));
  }

  isTagsEnabled() {
    return !!flarum.extensions['flarum-tags'];
  }

  updateDebug(state) {
    this.setting('fof-webhooks.debug')(state);

    return this.saveSettings(new Event(null));
  }
}
