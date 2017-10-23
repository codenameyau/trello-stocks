const api = require('./api');
const secret = require('./secret');
// const fundamentals = require('../data/robinhood/rh-fundamentals.json').results;


/********************************************************************
* UTILS
********************************************************************/
const round = exports.round = (num, precision = 2) => {
  if (num == null) { return 'N/A' };
  return parseFloat(num).toFixed(precision);
};

const formatTitle = exports.formatTitle = (ticker, fundamentals) => {
  const priceHigh = round(fundamentals.high, 2);
  const peRatio = round(fundamentals.pe_ratio, 2);
  const dividend = round(fundamentals.dividend_yield, 2);
  const dividendYield = dividend === 'N/A' ? '' : ` | ${dividend}%`;
  return `${ticker} - $${priceHigh} (P/E: ${peRatio}${dividendYield})`;
};

const formatDescription = exports.formatDescription = (fundamentals) => {
  return `Employees: ${fundamentals.num_employees} | Founded: ${fundamentals.year_founded} | CEO: ${fundamentals.ceo}\n\n${fundamentals.description}`;
};

const consumeFundamentals = exports.consumeFundamentals = (ticker, fundamentals) => {
  const data = {};
  data.name = formatTitle(ticker, fundamentals);
  data.description = formatDescription(fundamentals);
  return data;
};


/********************************************************************
* MAIN PROGRAM
********************************************************************/
const main = async () => {
  const boardLists = await api.getBoardLists(secret.TRELLO_BOARD_ID);
  const cards = {};

  boardLists.forEach((list) => {
    list.cards.forEach((card) => {
      const ticker = card.name.split(' ')[0].trim();
      cards[ticker] = card;
    });
  });

  const tickers = [...(new Set(Object.keys(cards)))];
  const fundamentals = await api.getTickerData('fundamentals', tickers);

  tickers.forEach((ticker, i) => {
    cards[ticker].fundamentals = fundamentals[i]
    cards[ticker].trelloUpdate = consumeFundamentals(ticker, fundamentals[i])
  });

  console.log(cards);

  // Send update requests to trello.
  tickers.forEach((ticker) => {
    const card = cards[ticker];
    const params = {
      name: card.trelloUpdate.name,
      desc: card.trelloUpdate.description
    };
    api.updateCard(card.id, params);
  });
};


main();
