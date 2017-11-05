const helpers = require('./helpers');

const ROBINHOOD_API = 'https://api.robinhood.com';

// Supports: 'fundamentals', 'quotes'
exports.getTickerData = async (noun, tickers) => {
  if (!tickers.length) { return []; }

  const symbols = `symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/${noun}/?${symbols}`;
  const data = await helpers.requestPromise(endpoint, 'robinhood');
  return data.results;
};

// TODO: handle pagination of 75. Works with 5 so far.
exports.getHistoricalQuotes = async (tickers) => {
  if (!tickers.length) { return []; }

  const params = helpers.serializeQuery({
    interval: 'week'
  });

  const symbols = `&symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/quotes/historicals/?${params}${symbols}`;
  return await helpers.requestPromise(endpoint);
};
