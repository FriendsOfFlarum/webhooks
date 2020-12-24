import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';

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
    }

    content() {
        const webhooks = app.store.all('webhooks');

        return (
            <div className="WebhookContent">
                <div className="container">
                    <form>
                        <h1>{app.translator.trans('fof-webhooks.admin.settings.title')}</h1>
                        <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.help.general')}</p>
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
}
