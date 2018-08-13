import Modal from 'flarum/components/Modal';
import Switch from 'flarum/components/Switch';

export default class WebhookEditModal extends Modal {
    init() {
        super.init();

        this.webhook = this.props.webhook;
        this.events = app.forum.attribute('reflar-webhooks.events');
    }

    className() {
        return 'Modal--medium';
    }

    title() {
        return app.translator.trans('reflar-webhooks.admin.settings.modal.title');
    }

    content() {
        return (
            <div className="ReflarWebhooksModal Modal-body">
                {app.translator.trans('reflar-webhoks.admin.settings.modal.description')}
                <div className="Webhook-events">
                    {this.events.map(event =>
                        Switch.component({
                            state: this.webhook.events().includes(event),
                            children: event,
                            onchange: this.onchange.bind(this, event),
                        })
                    )}
                </div>
            </div>
        );
    }

    onchange(event, checked, component) {
        component.loading = true;

        let events = this.webhook.events();

        if (checked) {
            events.push(event);
        } else {
            events.splice(events.indexOf(event), 1);
        }

        return this.props.updateWebhook(events)
            .then(() => {
                component.loading = false;
                m.lazyRedraw();
            });
    }
}
