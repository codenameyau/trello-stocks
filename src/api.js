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

const requestGetPromise = exports.requestGetPromise = (endpoint) => {
  return new Promise((resolve, reject) => {
    request(endpoint, (err, res, data) => {
      if (err) { reject(error); }
      else { resolve(data) }
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
  const params = objectToQueryString({
    ...defaultTrelloParams,
    cards: 'open',
    card_fields: 'name' // extendable with csv 'name,desc'
  });

  const endpoint = `${TRELLO_API}/boards/${boardId}/lists${params}`;
  return await requestGetPromise(endpoint);
};

exports.updateCard = async (cardId, params) => {

};


/********************************************************************
* ROBINHOOD API
********************************************************************/
const ROBINHOOD_API = 'https://api.robinhood.com';

// TODO: Robinhood API isn't working. Check headers.
exports.getQuotes = async (tickers) => {
  if (!tickers.length) { return []; }

  const symbols = `symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/quotes?${symbols}`;
  return await requestGetPromise(endpoint);
};

// TODO: handle pagination of 75. Works with 5 so far.
exports.getHistoricalQuotes = async (tickers) => {
  if (!tickers.length) { return []; }

  const params = objectToQueryString({
    interval: 'week'
  });

  const symbols = `&symbols=${tickers.join(',')}`;
  const endpoint = `${ROBINHOOD_API}/quotes/historicals${params}${symbols}`;
  console.log(endpoint);
  return await requestGetPromise(endpoint);
};
