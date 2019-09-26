# trello-stocks

## Available Commands
```bash
# This will update the stock tickers of all subscribed lists.
npm run update-board

# Run all unit tests.
npm run test
```

## Installation

Make sure you have the latest version of node.js (developed wth v8)
```bash
# Update node to latest version.
npm install -g n
n latest

# Install dependencies.
npm install
```

### Trello Setup
First log into your trello account then visit this URL:
- https://trello.com/app-key

It will contain two keys: your trello api key and your OAuth token. You will
need both of these fields.

Secondly get your trello board id from a network request. It will be located
in the response body for the `https://trello.com/1/Members/me` API call. Look at
the boards field and you should find it.

```json
{
  "boards": [
    {
      "id": "THIS IS WHAT YOU WANT",
      "name": "stocks",
      "shortLink": "ignore",
      "shortUrl": "ignore",
      "url": "ignore"
    }
  ]
}
```

Then create a `server/secrets.json` file from `secrets.example.json` and fill out
those fields.

Once that is set up, run the following to check that the Trello setup is working.
You should see a JSON reponse body of your board details. Confirm that it is the
correct board.

### Running script

Once that is complete you can run this script to update all tickers via data from
the unofficial Robinhood API.

Running script
```bash
npm run update
```

## Robinhood API

https://github.com/sanko/Robinhood/blob/master/Quote.md

```
https://api.robinhood.com/quotes/PYPL/
https://api.robinhood.com/quotes/?symbols=MSFT,FB,TSLA

https://api.robinhood.com/quotes/historicals/?symbols=MSFT,FB,TSLA&interval=week
https://api.robinhood.com/quotes/historicals/?symbols=MSFT,FB,TSLA&interval=day

https://api.robinhood.com/fundamentals/PYPL/
https://api.robinhood.com/fundamentals/?symbols=PYPL

https://api.robinhood.com/instruments/4df42b1f-8f39-49ae-bbfb-831c43931218/
```

## Development Resources

- Trello v1 API Reference: https://trello.readme.io/v1.0/reference
- Unofficial Robinhood API: https://github.com/sanko/Robinhood
- Obtaining Trello API Key: https://trello.com/app-key
- NPM Trello API examples: https://github.com/norberteder/trello/blob/master/main.js

## TODO
- Robinhood Note: The maximum number of symbols that can be defined per call is 1630 and 75 for historical.
- Cronjob for alerts.
- Data points: instrument, fundamentals, split
