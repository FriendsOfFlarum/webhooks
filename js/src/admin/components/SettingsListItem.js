import Component from 'flarum/Component';
import Select from 'flarum/components/Select';
import Button from 'flarum/components/Button';
import Alert from 'flarum/components/Alert';
import WebhookEditModal from './WebhookEditModal';

export default class SettingsListItem extends Component {
    init() {
        this.webhook = this.props.webhook;
        this.services = this.props.services;

        this.url = m.prop(this.webhook.url());
        this.service = m.prop(this.webhook.service());
        this.events = m.prop(this.webhook.events());
        this.error = m.prop(this.webhook.error());
    }

    view() {
        const { webhook, services } = this;

        const service = webhook.service();
        const errors = [webhook.error && webhook.error()];

        if (!services[service]) {
            errors.push(app.translator.trans('reflar-webhooks.admin.errors.service_not_found', { service }));
        } else if (!webhook.isValid()) {
            errors.push(app.translator.trans('reflar-webhooks.admin.errors.url_invalid'));
        }

        return (
            <div className="Webhooks--row">
                <div className="Webhook-input">
                    {Select.component({
                        options: services,
                        value: service,
                        onchange: this.update('service'),
                    })}
                    <input
                        className="FormControl Webhook-url"
                        type="url"
                        value={this.url()}
                        onchange={m.withAttr('value', this.update('url'))}
                        placeholder={app.translator.trans('reflar-webhooks.admin.settings.help.url')}
                    />
                    {Button.component({
                        type: 'button',
                        className: 'Button Webhook-button',
                        icon: 'fas fa-edit',
                        onclick: () =>
                            app.modal.show(
                                new WebhookEditModal({
                                    webhook,
                                    updateWebhook: this.update('events'),
                                })
                            ),
                    })}
                    {Button.component({
                        type: 'button',
                        className: 'Button Button--warning Webhook-button',
                        icon: 'fas fa-times',
                        onclick: this.delete.bind(this),
                    })}
                </div>

                {!this.events().length &&
                    Alert.component({
                        className: 'Webhook-error',
                        children: app.translator.trans('reflar-webhooks.admin.settings.help.disabled'),
                        dismissible: false,
                    })}

                {errors.filter(Boolean).map((error) =>
                    Alert.component({
                        children: app.translator.trans(error),
                        className: 'Webhook-error',
                        type: 'error',
                        dismissible: false,
                    })
                )}
            </div>
        );
    }

    update(field) {
        return (value) => {
            this[field](value);

            return this.webhook
                .save({
                    [field]: value,
                })
                .then(() => m.lazyRedraw());
        };
    }

    delete() {
        return this.webhook.delete().then(() => m.lazyRedraw());
    }
}
