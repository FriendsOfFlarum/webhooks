import Component from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';
import icon from 'flarum/common/helpers/icon';

import tagIcon from 'flarum/tags/common/helpers/tagIcon';

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

        const service = webhook.service();
        const errors = [webhook.error && webhook.error()];

        if (!services[service]) {
            errors.push(app.translator.trans('fof-webhooks.admin.errors.service_not_found', { service }));
        } else if (!webhook.isValid()) {
            errors.push(app.translator.trans('fof-webhooks.admin.errors.url_invalid'));
        }

        const tagsEnabled = app.initializers.has('flarum-tags');
        const tag = webhook.tag();
        const tagIdLoading = !!this.loading['tag_id'];

        return (
            <div className="Webhooks--row">
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

                    {tagsEnabled && (
                        <Dropdown
                            buttonClassName="Button"
                            label={
                                tag ? (
                                    <span>
                                        {!tagIdLoading && tagIcon(tag, { className: 'Button-icon' })} {tag.name()}
                                    </span>
                                ) : (
                                    app.translator.trans('fof-webhooks.admin.settings.item.tag_any_label')
                                )
                            }
                            icon={tagIdLoading ? 'fas fa-spinner fa-spin' : tag ? true : 'fas fa-tag'}
                            caretIcon={null}
                        >
                            <Button icon={'fas fa-tag'} onclick={() => this.update('tag_id')(null)}>
                                {app.translator.trans('fof-webhooks.admin.settings.item.tag_any_label')}
                            </Button>

                            <hr />

                            {app.store.all('tags').map((tag) => (
                                <Button icon={true} onclick={() => this.update('tag_id')(tag.id())}>
                                    {tagIcon(tag, { className: 'Button-icon' })} {tag.name()}
                                </Button>
                            ))}
                        </Dropdown>
                    )}

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
