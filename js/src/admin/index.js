import app from 'flarum/admin/app';
import Model from 'flarum/common/Model';
import Forum from 'flarum/common/models/Forum';

import Webhook from './models/Webhook';
import WebhooksPage from './components/WebhooksPage';

app.initializers.add('beb/webhooks', () => {
  app.store.models.webhooks = Webhook;

  Forum.prototype.webhooks = Model.hasMany('webhooks');

  app.extensionData.for('beb-webhooks').registerPage(WebhooksPage);
});
