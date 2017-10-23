const api = require('./api');
// const secret = require('./secret');
const boardLists = require('../data/trello/board-list-small.json');
const fundamentals = require('../data/robinhood/rh-fundamentals.json').results;


/********************************************************************
* UTILS
********************************************************************/
const formatTitle = exports.formatTitle = (fundamentals) => {
  const symbol = stock.symbol.toUpperCase();
  const name = stock.name;
  const format = `${symbol} (${name})`;
};

const formatDescription = exports.formatDescription = (fundamentals) => {

};

const consumeFundamentals = exports.consumeFundamentals = (fundamentals) => {
  const data = {};
  data.title = formatTitle(fundamentals);
  data.description = formatDescription(fundamentals);
  return data;
};


/********************************************************************
* MAIN PROGRAM
********************************************************************/
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
  // const fundamentals = await api.getTickerData('fundamentals', tickers);

  tickers.forEach((ticker, i) => {
    cards[ticker].fundamentals = fundamentals[i]
    cards[ticker].trelloUpdate = consumeFundamentals(fundamentals[i])
  });

  console.log(cards);

  // console.log(fundamentals);
  // console.log(Object.keys(cards));
  // console.log(tickersInfo);
};


main();
