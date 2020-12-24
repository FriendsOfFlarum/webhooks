import Switch from 'flarum/common/components/Switch';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';
import Group from 'flarum/common/models/Group';
import Modal from 'flarum/common/components/Modal';
import Stream from 'flarum/common/utils/Stream';

const sortByProp = (prop) => (a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase

    return propA < propB ? -1 : propA > propB ? 1 : 0;
};

const groupBy = (obj, fn) => {
    const keys = Object.keys(obj);
    const vals = Object.values(obj);

    return keys.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, val, i) => {
        if (!acc[val]) acc[val] = {};

        acc[val][keys[i]] = vals[i];

        return acc;
    }, {});
};

export default class WebhookEditModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);

        this.webhook = this.attrs.webhook;

        const events = app.data['fof-webhooks.events'];

        this.loadingGroup = Stream(false);

        this.groupId = Stream(this.webhook.groupId() || Group.GUEST_ID);
        this.extraText = Stream(this.webhook.extraText() || '');

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
            (key) => key.split('.')[0]
        );
    }

    className() {
        return 'Modal--medium';
    }

    title() {
        return app.translator.trans('fof-webhooks.admin.settings.modal.title');
    }

    content() {
        const icons = {
            2: 'fas fa-globe',
            3: 'fas fa-user',
        };

        const group = app.store.getById('groups', this.groupId());

        return (
            <div className="FofWebhooksModal Modal-body">
                {app.translator.trans('fof-webhooks.admin.settings.modal.description')}

                <form className="Form" onsubmit={this.onsubmit.bind(this)}>
                    <div className="Form-group hasLoading">
                        <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_label')}</label>

                        <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.extra_text_help')}</p>

                        <input type="text" className="FormControl" bidi={this.extraText} onkeypress={this.onkeypress.bind(this)} />
                    </div>

                    <div className="Form-group">
                        <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.group_label')}</label>
                        <p className="helpText">{app.translator.trans('fof-webhooks.admin.settings.modal.group_help')}</p>

                        <Dropdown label={[icon(group.icon() || icons[group.id()]), group.namePlural()]} buttonClassName="Button Button--danger">
                            {app.store
                                .all('groups')
                                .filter((g) => ['1', '2'].includes(g.id()))
                                .map((g) => (
                                    <Button
                                        active={group.id() === g.id()}
                                        disabled={group.id() === g.id()}
                                        icon={g.icon() || icons[g.id()]}
                                        onclick={() => this.groupId(g.id())}
                                    >
                                        {g.namePlural()}
                                    </Button>
                                ))}
                        </Dropdown>
                    </div>

                    <div className="Form-group Webhook-events">
                        <label className="label">{app.translator.trans('fof-webhooks.admin.settings.modal.events_label')}</label>

                        {Object.entries(this.events).map(([, events]) => (
                            <div>
                                {Object.entries(events)
                                    .sort(sortByProp(0))
                                    .map(([group, events]) =>
                                        events.length ? (
                                            <div>
                                                <h3>{this.translate(group)}</h3>
                                                {events.map((event) => (
                                                    <Switch
                                                        state={this.webhook.events().includes(event.full)}
                                                        onchange={this.onchange.bind(this, event.full)}
                                                    >
                                                        {this.translate(group, event.name.toLowerCase())}
                                                    </Switch>
                                                ))}
                                            </div>
                                        ) : null
                                    )}
                            </div>
                        ))}
                    </div>

                    <div className="Form-group">
                        <Button type="submit" className="Button Button--primary" loading={this.loading} disabled={!this.isDirty()}>
                            {app.translator.trans('core.admin.settings.submit_button')}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    translate(group, key = 'title') {
        return app.translator.trans(`fof-webhooks.admin.settings.actions.${group}.${key}`);
    }

    isDirty() {
        return this.extraText() !== this.webhook.extraText() || this.groupId() != this.webhook.groupId();
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        return this.webhook
            .save({
                extraText: this.extraText(),
                group_id: this.groupId(),
            })
            .then(() => {
                this.loading = false;

                m.redraw();
            });
    }

    onkeypress(e) {
        if (e.key === 'Enter') {
            this.onsubmit(e);
        }
    }

    onchange(event, checked, component) {
        component.loading = true;

        let events = this.webhook.events();

        if (checked) {
            events.push(event);
        } else {
            events.splice(events.indexOf(event), 1);
        }

        return this.attrs.updateWebhook(events).then(() => {
            component.loading = false;
            m.redraw();
        });
    }
}
