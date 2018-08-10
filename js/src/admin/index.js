import app from 'flarum/app';
import Model from 'flarum/Model';
import Forum from 'flarum/models/Forum';

import Webhook from './models/Webhook';
import addSettingsPage from './addSettingsPage';

app.initializers.add('reflar/webhooks', () => {
    app.store.models.webhooks = Webhook;

    Forum.prototype.webhooks = Model.hasMany('webhooks');

    addSettingsPage();
});
