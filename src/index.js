const api = require('./api');
// const secret = require('./secret');
const dump = require('../data/dump/board-list-small');

const main = async () => {
  // const boardLists = await api.getBoardLists(secret.TRELLO_BOARD_ID);
  const boardLists = dump.data;
  const cards = {};

  boardLists.forEach((list) => {
    list.cards.forEach((card) => {
      const ticker = card.name.split(' ')[0].trim();
      cards[ticker] = card;
    });
  });

  const tickers = Object.keys(cards);
  const tickersInfo = await api.getTickersInfo(tickers);
  console.log(Object.keys(cards));
  console.log(tickersInfo);
};

main();
