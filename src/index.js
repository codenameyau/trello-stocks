const api = require('./api');
// const secret = require('./secret');
const boardLists = require('../data/trello/board-list-small.json');

// NAK - (Northern Dynasty Minerals) [N/A | 123]
const formatTitle = exports.formatTitle = (stock) => {
  const symbol = stock.symbol.toUpperCase();
  const name = stock.name;
  const format = `${symbol} (${name})`;
};

const main = async () => {
  // const boardLists = await api.getBoardLists(secret.TRELLO_BOARD_ID);
  const cards = {};
  console.log(boardLists);

  boardLists.forEach((list) => {
    list.cards.forEach((card) => {
      const ticker = card.name.split(' ')[0].trim();
      cards[ticker] = card;
    });
  });

  const tickers = [...(new Set(Object.keys(cards)))];
  console.log(cards);
  console.log(tickers);
  const tickersFundamentals = await api.getTickerData('fundamentals', tickers);
  console.log(tickersFundamentals);
  // console.log(Object.keys(cards));
  // console.log(tickersInfo);
};


main();
