import app from 'flarum/admin/app';

export { default as extend } from './extend';

app.initializers.add('fof/webhooks', () => {
  // Settings are now registered via extend.ts
});
