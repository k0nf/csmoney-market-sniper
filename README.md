# csmoney-sniper-bot

csmoney-sniper-bot is a bot that runs every minute to check the knife market listings in https://cs.money/market/ to see if there's a knife under the price that is set in the config.json file and sends a message to a custom discord webhook

## Installation

```bash
yarn
````
or
```bash
npm install
```

## Usage

Update config.json with the proper information and then run

```bash
node index.js
```
or 
```bash
yarn start
```

## config.json example

```json
{
    "alertPrice": 50, // This means that anything under $50 found will send a notification to your webhook
    "discordWebhook": "https://discord.com/api/webhooks/...", // You can get a webhook from a discord server. Read more here: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
    "intantOnly": true, // Turning this boolean true will only scan for instant trades.
    "instantURL": "https://cs.money/1.0/market/sell-orders?deliverySpeed=instant&limit=1&order=asc&sort=price&type=2",
    "normalURL": "https://cs.money/1.0/market/sell-orders?limit=1&order=asc&sort=price&type=2"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.