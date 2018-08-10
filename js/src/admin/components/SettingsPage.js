import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';
import Select from 'flarum/components/Select';
import saveSettings from 'flarum/utils/saveSettings';

export default class SettingsPage extends Page {
    init() {
        this.values = {};
        this.services = app.forum.attribute('reflar-webhooks-services').reduce((o, service) => {
            o[service] = app.translator.trans(`reflar-webhooks.admin.settings.services.${service}`);
            return o;
        }, {});

        this.webhooks = app.forum.webhooks();

        this.settingsPrefix = 'reflar.webhooks';

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
        return (
            <div className="WebhooksPage">
                <div className="container">
                    <form onsubmit={this.onsubmit.bind(this)}>
                        <fieldset>
                            <legend>{app.translator.trans('reflar-webhooks.admin.settings.title')}</legend>
                            <label>{app.translator.trans('reflar-webhooks.admin.settings.webhooks')}</label>
                            <div style="margin-bottom: -10px" className="helpText">
                                {app.translator.trans('reflar-webhooks.admin.settings.help.general')}
                            </div>
                            <br />
                            <div className="Webhooks--Container">
                                {this.webhooks.map(webhook => {
                                    return [
                                        <div className="Webhooks--row">
                                            <div className="Webhook-input">
                                                {Select.component({
                                                    options: this.services,
                                                    value: webhook.service(),
                                                    onchange: value => this.updateWebhook(webhook, 'service', value),
                                                })}
                                                <input
                                                    className="FormControl Webhook-url"
                                                    type="url"
                                                    value={webhook.url()}
                                                    placeholder={app.translator.trans('reflar-webhooks.admin.settings.help.url')}
                                                    onchange={m.withAttr('value', this.updateWebhook.bind(this, webhook, 'url'))}
                                                />
                                                {Button.component({
                                                    type: 'button',
                                                    className: 'Button Button--warning Webhook-button',
                                                    icon: 'fas fa-times',
                                                    onclick: () => this.deleteWebhook(webhook),
                                                })}
                                            </div>

                                            {webhook.error &&
                                                webhook.error() &&
                                                Alert.component({
                                                    children: webhook.error(),
                                                    className: 'Webhook-error',
                                                    type: 'error',
                                                    dismissible: false,
                                                })}
                                        </div>,
                                    ];
                                })}
                                <br />
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
                                            onclick: () => this.addWebhook(this),
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

    onsubmit(e) {
        // prevent the usual form submit behaviour
        e.preventDefault();

        // if the page is already saving, do nothing
        if (this.loading) return false;

        // prevents multiple savings
        this.loading = true;

        // remove previous success popup
        app.alerts.dismiss(this.successAlert);

        const settings = {};

        // actually saves everything in the database
        saveSettings(settings)
            .then(() => {
                // on success, show popup
                app.alerts.show(
                    (this.successAlert = new Alert({
                        type: 'success',
                        children: app.translator.trans('core.admin.basics.saved_message'),
                    }))
                );
            })
            .catch(() => {})
            .then(() => {
                // return to the initial state and redraw the page
                this.loading = false;
                m.redraw();
            });

        return false;
    }

    /**
     *
     * @param webhook
     */
    addWebhook(webhook) {
        this.newWebhook.loading(true);

        app.request({
            method: 'POST',
            url: `${app.forum.attribute('apiUrl')}/reflar/webhooks`,
            data: {
                service: this.newWebhook.service(),
                url: this.newWebhook.url(),
            },
        })
            .then(response => {
                this.webhooks.push({
                    id: m.prop(response.data.id),
                    service: m.prop(response.data.attributes.service),
                    url: m.prop(response.data.attributes.url),
                });

                this.newWebhook.service('discord');
                this.newWebhook.url('');
                this.newWebhook.loading(false);

                m.lazyRedraw();
            })
            .catch(() => {
                this.newWebhook.loading(false);

                m.lazyRedraw();
            });
    }

    updateWebhook(webhook, field, value) {
        app.request({
            method: 'PATCH',
            url: `${app.forum.attribute('apiUrl')}/reflar/webhooks/${webhook.id()}`,
            data: {
                [field]: value,
            },
        });

        this.webhooks.some(w => {
            if (w.id() === webhook.id()) {
                w[field] = m.prop(value);
                return true;
            }
        });
    }

    deleteWebhook(webhook) {
        app.request({
            method: 'DELETE',
            url: `${app.forum.attribute('apiUrl')}/reflar/webhooks/${webhook.id()}`,
        });

        this.webhooks.splice(this.webhooks.indexOf(webhook), 1);
    }

    /**
     * @returns boolean
     */
    changed() {
        return this.fields.some(key => this.values[key]() !== (app.data.settings[this.addPrefix(key)] || ''));
    }
}
