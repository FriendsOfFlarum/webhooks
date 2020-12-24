import Component from 'flarum/common/Component';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';

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
    }

    view() {
        const { webhook, services } = this;

        const service = webhook.service();
        const errors = [webhook.error && webhook.error()];

        if (!services[service]) {
            errors.push(app.translator.trans('fof-webhooks.admin.errors.service_not_found', { service }));
        } else if (!webhook.isValid()) {
            errors.push(app.translator.trans('fof-webhooks.admin.errors.url_invalid'));
        }

        return (
            <div className="Webhooks--row">
                <div className="Webhook-input">
                    <Select options={services} value={service} onchange={this.update('service')} />

                    <input
                        className="FormControl Webhook-url"
                        type="url"
                        value={this.url()}
                        onchange={withAttr('value', this.update('url'))}
                        placeholder={app.translator.trans('fof-webhooks.admin.settings.help.url')}
                    />

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
                        {app.translator.trans('fof-webhooks.admin.settings.help.disabled')}
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
            return this.webhook
                .save({
                    [field]: value,
                })
                .then(() => m.redraw());
        };
    }

    delete() {
        return this.webhook.delete().then(() => m.redraw());
    }
}
