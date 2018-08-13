import Component from 'flarum/Component';
import Select from 'flarum/components/Select';
import Button from 'flarum/components/Button';
import Alert from 'flarum/components/Alert';
import WebhookEditModal from './WebhookEditModal';

export default class SettingsListItem extends Component {
    view() {
        const { webhook, services, onChange, onDelete } = this.props;

        return (
            <div className="Webhooks--row">
                <div className="Webhook-input">
                    {Select.component({
                        options: services,
                        value: webhook.service(),
                        onchange: value => onChange(webhook, 'service', value),
                    })}
                    <input
                        className="FormControl Webhook-url"
                        type="url"
                        value={webhook.url()}
                        placeholder={app.translator.trans('reflar-webhooks.admin.settings.help.url')}
                        onchange={m.withAttr('value', value => onChange(webhook, 'url', value))}
                    />
                    {Button.component({
                        type: 'button',
                        className: 'Button Webhook-button',
                        icon: 'fas fa-edit',
                        onclick: () => app.modal.show(
                            new WebhookEditModal({
                                webhook,
                                updateWebhook: events => onChange(webhook, 'events', events),
                            })
                        ),
                    })}
                    {Button.component({
                        type: 'button',
                        className: 'Button Button--warning Webhook-button',
                        icon: 'fas fa-times',
                        onclick: () => onDelete(webhook),
                    })}
                </div>

                {!webhook.events().length && Alert.component({
                    className: 'Webhook-error',
                    children: app.translator.trans('reflar-webhooks.admin.settings.help.disabled'),
                    dismissible: false,
                })}

                {webhook.error &&
                    webhook.error() &&
                    Alert.component({
                        children: webhook.error(),
                        className: 'Webhook-error',
                        type: 'error',
                        dismissible: false,
                    })}
            </div>
        );
    }
}
