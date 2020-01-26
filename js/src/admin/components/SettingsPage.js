import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';
import Select from 'flarum/components/Select';
import SettingsListItem from './SettingsListItem';
import Webhook from '../models/Webhook';

export default class SettingsPage extends Page {
    init() {
        super.init();

        this.values = {};
        this.services = app.data['reflar-webhooks.services'].reduce((o, service) => {
            o[service] = app.translator.trans(`reflar-webhooks.admin.settings.services.${service}`);
            return o;
        }, {});

        this.newWebhook = {
            service: m.prop('discord'),
            url: m.prop(''),
            loading: m.prop(false),
        };
    }

    /**
     * @returns {*}
     */
    view() {
        const webhooks = app.store.all('webhooks');

        return (
            <div className="WebhooksPage">
                <div className="container">
                    <form>
                        <h1>{app.translator.trans('reflar-webhooks.admin.settings.title')}</h1>
                        <p className="helpText">{app.translator.trans('reflar-webhooks.admin.settings.help.general')}</p>
                        <fieldset>
                            <div className="Webhooks--Container">
                                {webhooks.map(webhook =>
                                    SettingsListItem.component({
                                        webhook,
                                        services: this.services,
                                    })
                                )}
                                <div className="Webhooks--row">
                                    <div className="Webhook-input">
                                        {Select.component({
                                            options: this.services,
                                            value: this.newWebhook.service(),
                                            onchange: this.newWebhook.service,
                                        })}
                                        <input
                                            className="FormControl Webhook-url"
                                            type="url"
                                            placeholder={app.translator.trans('reflar-webhooks.admin.settings.help.url')}
                                            onchange={m.withAttr('value', this.newWebhook.url)}
                                        />
                                        {Button.component({
                                            type: 'button',
                                            loading: this.newWebhook.loading(),
                                            className: 'Button Button--warning Webhook-button',
                                            icon: 'fas fa-plus',
                                            onclick: this.addWebhook.bind(this),
                                        })}
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

    /**
     * @returns boolean
     */
    changed() {
        return this.fields.some(key => this.values[key]() !== (app.data.settings[this.addPrefix(key)] || ''));
    }
}
