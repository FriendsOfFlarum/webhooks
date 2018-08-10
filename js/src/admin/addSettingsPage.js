import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';

import SettingsPage from './components/SettingsPage';

export default function() {
    app.routes['reflar-webhooks'] = { path: '/reflar/webhooks', component: SettingsPage.component() };

    app.extensionSettings['reflar-webhooks'] = () => m.route(app.route('reflar-webhooks'));

    extend(AdminNav.prototype, 'items', items => {
        items.add(
            'reflar-webhooks',
            AdminLinkButton.component({
                href: app.route('reflar-webhooks'),
                icon: 'fas fa-external-link-alt',
                children: 'Webhooks',
                description: app.translator.trans('reflar-webhooks.admin.nav.desc'),
            })
        );
    });
}
