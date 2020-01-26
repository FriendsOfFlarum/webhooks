import Modal from 'flarum/components/Modal';
import Switch from 'flarum/components/Switch';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import icon from 'flarum/helpers/icon';
import Group from 'flarum/models/Group';

const sortByProp = prop => (a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase

    return propA < propB ? -1 : propA > propB ? 1 : 0;
};

const groupBy = (obj, fn) => {
    const keys = Object.keys(obj);
    const vals = Object.values(obj);

    return keys.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
        if (!acc[val]) acc[val] = {};

        acc[val][keys[i]] = vals[i];

        return acc;
    }, {});
};

export default class WebhookEditModal extends Modal {
    init() {
        super.init();

        this.webhook = this.props.webhook;

        const events = app.data['reflar-webhooks.events'];

        this.loadingGroup = m.prop(false);

        this.events = groupBy(
            events.reduce(
                (obj, evt) => {
                    const m = /((?:[a-z]+\\?)+?)\\Events?\\([a-z]+)/i.exec(evt);

                    if (!m) {
                        obj.other.push({
                            full: evt,
                            name: evt,
                        });
                        obj.other = obj.other.sort();
                        return obj;
                    }

                    const group = m[1].toLowerCase().replace('\\', '.');

                    if (!obj[group]) obj[group] = [];

                    obj[group] = obj[group]
                        .concat({
                            full: evt,
                            name: m[2],
                        })
                        .sort();

                    return obj;
                },
                { other: [] }
            ),
            key => key.split('.')[0]
        );
    }

    className() {
        return 'Modal--medium';
    }

    title() {
        return app.translator.trans('reflar-webhooks.admin.settings.modal.title');
    }

    content() {
        const icons = {
            2: 'fas fa-globe',
            3: 'fas fa-user',
        };

        const group = app.store.getById('groups', this.webhook.groupId()) || app.store.getById('groups', Group.MEMBER_ID);

        return (
            <div className="ReflarWebhooksModal Modal-body">
                {app.translator.trans('reflar-webhooks.admin.settings.modal.description')}

                <div className="Form">
                    <div className="Form-group">
                        {Dropdown.component({
                            label: [icon(this.loadingGroup() ? 'fas fa-spinner fa-spin' : group.icon() || icons[group.id()]), group.namePlural()],
                            buttonClassName: 'Button Button--danger',
                            children: app.store
                                .all('groups')
                                .filter(g => ['1', '2'].includes(g.id()))
                                .map(g =>
                                    Button.component({
                                        active: group.id() === g.id(),
                                        disabled: group && group.id() === g.id(),
                                        children: g.namePlural(),
                                        icon: g.icon() || icons[g.id()],
                                        onclick: this.changeGroup.bind(this, g),
                                    })
                                ),
                        })}
                    </div>

                    <div className="Webhook-events">
                        {Object.entries(this.events).map(([vendor, events]) => (
                            <div>
                                {Object.entries(events)
                                    .sort(sortByProp(0))
                                    .map(([group, events]) =>
                                        events.length ? (
                                            <div>
                                                <h3>{this.translate(group)}</h3>
                                                {events.map(event =>
                                                    Switch.component({
                                                        state: this.webhook.events().includes(event.full),
                                                        children: this.translate(group, event.name.toLowerCase()),
                                                        onchange: this.onchange.bind(this, event.full),
                                                    })
                                                )}
                                            </div>
                                        ) : null
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    translate(group, key = 'title') {
        return app.translator.trans(`reflar-webhooks.admin.settings.actions.${group}.${key}`);
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

    changeGroup(group) {
        this.loadingGroup(true);

        return this.webhook
            .save({
                group_id: group.id(),
            })
            .then(() => {
                this.loadingGroup(false);
                m.lazyRedraw();
            });
    }
}
