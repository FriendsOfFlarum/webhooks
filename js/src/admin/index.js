import app from 'flarum/app';

app.initializers.add('reflar/webhooks', () => {
  console.log('Hello, admin!');
});
