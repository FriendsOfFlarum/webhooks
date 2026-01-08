import Extend from 'flarum/common/extenders';
import WebhooksPage from './components/WebhooksPage';
import Webhook from './models/Webhook';
import Forum from 'flarum/common/models/Forum';

export default [new Extend.Store().add('fof-webhooks', Webhook), new Extend.Admin().page(WebhooksPage)];
