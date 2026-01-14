# FriendsOfFlarum Webhooks

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/fof/webhooks.svg)](https://packagist.org/packages/fof/webhooks) [![OpenCollective](https://img.shields.io/badge/opencollective-fof-blue.svg)](https://opencollective.com/fof/donate) [![Donate](https://img.shields.io/badge/donate-dsevillamartin-important.svg)](https://dsevilla.dev/donate)

A [Flarum](http://flarum.org) extension that allows you to integrate Flarum with external services via webhooks. Automatically notify Discord, Slack, and Microsoft Teams when events happen on your forum.

### Installation

Install manually with composer:

```sh
composer require fof/webhooks
```

### Updating

```sh
composer update fof/webhooks
```

### Usage

#### Add a Webhook

- Navigate to the extension settings via the side menu item "Webhooks".
- Select the service you are connecting to (e.g., Discord, Slack, Microsoft Teams).
- Paste the **Webhook URL** provided by that service.
- Click the **+** button to create a new webhook.
- Choose the events you want to trigger this webhook (e.g., Discussion Started, Post Created, User Registered).

#### Getting Webhook URLs

#### Discord
1. Go to a Discord channel settings.
2. Select **Integrations** -> **Webhooks**.
3. Click **New Webhook**.
4. Customize the name (can be overridden by extension settings).
5. Copy the generated **Webhook URL**.

#### Slack

Refer to the official Slack documentation for more info: https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/
1. Create a Slack app (if you don't have one) here: https://api.slack.com/apps
2. **Activate Incoming Webhooks** for your app in its settings page.
3. Click **Add New Webhook to Workspace**.
4. Select the channel to post to and authorize.
5. Copy the generated **Webhook URL**.

#### Microsoft Teams

Refer to official Microsoft Teams documentation for more info: https://support.microsoft.com/en-us/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498.
Note that the old method ([Microsoft/Office 365 Connectors](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)) still work as of January 2026, but are deprecated.

1. Navigate to the channel where you want to add the webhook.
2. Click the `...` (More options) next to the channel name.
3. Select **Connectors**.
4. Search for **Incoming Webhook** and click **Configure**.
5. Give it a name and click **Create**.
6. Copy the URL displayed at the bottom of the window.


### Links

[![OpenCollective](https://img.shields.io/badge/donate-friendsofflarum-44AEE5?style=for-the-badge&logo=open-collective)](https://opencollective.com/fof/donate) [![GitHub](https://img.shields.io/badge/donate-dsevillamartin-ea4aaa?style=for-the-badge&logo=github)](https://dsevilla.dev/donate/github)

- [Packagist](https://packagist.org/packages/fof/webhooks)
- [GitHub](https://github.com/friendsofflarum/webhooks)

An extension by [FriendsOfFlarum](https://github.com/FriendsOfFlarum).
