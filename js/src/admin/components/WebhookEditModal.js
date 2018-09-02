import Modal from 'flarum/components/Modal';
import Switch from 'flarum/components/Switch';

const sortByProp = prop => (a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase

    return propA < propB ? -1 : (propA > propB ? 1 : 0);
};

export default class WebhookEditModal extends Modal {
    init() {
        super.init();

        this.webhook = this.props.webhook;

        const events = app.forum.attribute('reflar-webhooks.events');

        this.events = events.reduce(
            (obj, evt) => {
                const m = /((?:[a-z]+\\?)+?)\\Event\\([a-z]+)/i.exec(evt);

                if (!m) {
                    obj.Other.push({
                        full: evt,
                        name: evt,
                    });
                    obj.Other = obj.Other.sort();
                    return obj;
                }

                const group = m[1];

                if (!obj[group]) obj[group] = [];

                obj[group].push({
                    full: evt,
                    name: m[2],
                });
                obj[group] = obj[group].sort();

                return obj;
            },
            { Other: [] }
        );
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
                    {Object.entries(this.events).sort(sortByProp(0)).map(
                        ([group, events]) =>
                            events.length ? (
                                <div>
                                    <h3>{group}</h3>
                                    {events.map(event =>
                                        Switch.component({
                                            state: this.webhook.events().includes(event.full),
                                            children: event.name,
                                            onchange: this.onchange.bind(this, event.full),
                                        })
                                    )}
                                </div>
                            ) : null
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

        return this.props.updateWebhook(events).then(() => {
            component.loading = false;
            m.lazyRedraw();
        });
    }
}
