const helpers = require('./helpers');

const TRELLO_API = 'https://api.trello.com/1';
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

const defaultTrelloParams = {
  key: TRELLO_API_KEY,
  token: TRELLO_API_TOKEN
};

exports.getBoardLists = async (boardId) => {
  const queryString = helpers.serializeQuery({
    ...defaultTrelloParams,
    cards: 'open',
    card_fields: 'name' // extendable with 'name,desc'
  });

  const endpoint = `${TRELLO_API}/boards/${boardId}/lists${queryString}`;
  return await helpers.requestPromise(endpoint);
};

exports.updateCard = async (cardId, params) => {
  const queryString = helpers.serializeQuery({
    ...defaultTrelloParams,
    ...params
  });

  var options = {
    method: 'PUT',
    url: `${TRELLO_API}/cards/${cardId}${queryString}`
  };
  return await helpers.requestPromise(options);
};
