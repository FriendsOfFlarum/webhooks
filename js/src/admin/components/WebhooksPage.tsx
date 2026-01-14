import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

import SettingsListItem from './SettingsListItem';
import Mithril from 'mithril';
import { SaveSubmitEvent } from 'flarum/admin/components/AdminPage';

export default class WebhooksPage extends ExtensionPage {
  services!: Record<string, string>;
  values!: Record<string, Stream<string>>;

  newWebhook!: {
    service: Stream<string>;
    url: Stream<string>;
    loading: Stream<boolean>;
  };

  loadingData!: Stream<boolean>;

  oninit(vnode: Mithril.Vnode<ExtensionPageAttrs, this>): any {
    super.oninit(vnode);

    const services = app.data['fof-webhooks.services'] as string[];

    this.values = {};
    this.services = services.reduce(
      (o, service) => {
        o[service] = app.translator.trans(`fof-webhooks.admin.settings.services.${service}`, {}, true);
        return o;
      },
      {} as typeof this.services
    );

    this.newWebhook = {
      service: Stream('discord'),
      url: Stream(''),
      loading: Stream(false),
    };

    this.loadingData = Stream(true);
  }

  oncreate(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>) {
    super.oncreate(vnode);

    Promise.all([app.store.find('fof-webhooks'), this.isTagsEnabled() && app.store.find('tags')]).then(() => {
      this.loadingData(false);
      m.redraw();
    });
  }

  content() {
    const webhooks = app.store.all('fof-webhooks');

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
                  <SettingsListItem webhook={webhook} services={this.services} key={webhook.id()} />
                ))}
                <div className="Webhooks--row">
                  <div className="Webhook-input">
                    <Select options={this.services} value={this.newWebhook.service()} onchange={this.newWebhook.service} />

                    <input
                      className="FormControl Webhook-url"
                      type="url"
                      placeholder={app.translator.trans('fof-webhooks.admin.settings.help.url')}
                      bidi={this.newWebhook.url}
                      onkeypress={this.onkeypress.bind(this)}
                    />

                    <Button
                      type="button"
                      loading={this.newWebhook.loading()}
                      className="Button Button--success Webhook-button"
                      icon="fas fa-plus"
                      onclick={this.addWebhook.bind(this)}
                    >
                      {app.translator.trans('fof-webhooks.admin.settings.item.create_button')}
                    </Button>
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
      .createRecord('fof-webhooks')
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

  onkeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addWebhook();
    }
  }

  isTagsEnabled() {
    return !!flarum.extensions['flarum-tags'];
  }

  updateDebug(state: boolean) {
    this.setting('fof-webhooks.debug')(state);

    return this.saveSettings(new Event('') as SaveSubmitEvent);
  }
}
