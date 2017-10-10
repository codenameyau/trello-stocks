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
