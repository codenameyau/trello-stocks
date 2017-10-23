const request = require('request');
const secret = require('./secret');


/********************************************************************
* API UTILS
********************************************************************/
const objectToQueryString = exports.objectToQueryString = (object) => {
  return '?' + Object.keys(object).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
  }).join('&');
};

const requestPromise = exports.requestPromise = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, res, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data))
      }
    });
  });
};


/********************************************************************
* TRELLO API
********************************************************************/
const TRELLO_API = 'https://api.trello.com/1';

const defaultTrelloParams = {
  key: secret.TRELLO_API_KEY,
  token: secret.TRELLO_API_TOKEN
};

exports.getBoardLists = async (boardId) => {
  const queryString = objectToQueryString({
    ...defaultTrelloParams,
    cards: 'open',
    card_fields: 'name' // extendable with 'name,desc'
  });

  const endpoint = `${TRELLO_API}/boards/${boardId}/lists${queryString}`;
  return await requestPromise(endpoint);
};

exports.updateCard = async (cardId, params) => {
  const queryString = objectToQueryString({
    ...defaultTrelloParams,
    ...params
  });

  var options = {
    method: 'PUT',
    url: `https://api.trello.com/1/cards/${cardId}${queryString}`
  };
  return await requestPromise(options);
};


/********************************************************************
* ROBINHOOD API
********************************************************************/
const ROBINHOOD_API = 'https://api.robinhood.com';

// Supports: 'fundamentals', 'quotes'
exports.getTickerData = async (noun, tickers) => {
  if (!tickers.length) { return []; }

  const symbols = `symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/${noun}/?${symbols}`;
  const data = await requestPromise(endpoint, 'robinhood');
  return data.results;
};

// TODO: handle pagination of 75. Works with 5 so far.
exports.getHistoricalQuotes = async (tickers) => {
  if (!tickers.length) { return []; }

  const params = objectToQueryString({
    interval: 'week'
  });

  const symbols = `&symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/quotes/historicals/?${params}${symbols}`;
  console.log(endpoint);
  return await requestPromise(endpoint);
};
