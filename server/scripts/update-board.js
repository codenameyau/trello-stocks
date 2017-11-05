const trello = require('../api/trello');
const robinhood = require('../api/robinhood');
const humanize = require('../utils/humanize');

const TRELLO_BOARD_ID = process.env.TRELLO_BOARD_ID;

/********************************************************************
* HELPERS
********************************************************************/
const formatTitle = exports.formatTitle = (ticker, fundamentals) => {
  const priceHigh = humanize.round(fundamentals.high, 2);
  const peRatio = humanize.round(fundamentals.pe_ratio, 2);
  return `${ticker} - $${priceHigh} (P/E: ${peRatio})`;
};

const formatDescription = exports.formatDescription = (fundamentals) => {
  const employees = fundamentals.num_employees == null ? 'N/A' : fundamentals.num_employees;
  const founded = fundamentals.year_founded
  const marketCap = humanize.humanizeNumber(parseFloat(fundamentals.market_cap));
  const ceo = fundamentals.ceo;
  const desc = fundamentals.description;
  return `Employees: ${employees} | Founded: ${founded} | Market Cap: ${marketCap}\n\nCEO: ${ceo}\n\n${desc}`;
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
const updateCardTickers = exports.updateCardTickers = async (verbose) => {
  const boardLists = await trello.getBoardLists(TRELLO_BOARD_ID);
  const cards = {};

  boardLists.forEach((list) => {
    if (list.subscribed) {
      list.cards.forEach((card) => {
        const ticker = card.name.split(' ')[0].trim();
        cards[ticker] = card;
      });
    }
  });

  const tickers = [...(new Set(Object.keys(cards)))];
  const fundamentals = await robinhood.getTickerData('fundamentals', tickers);

  tickers.forEach((ticker, i) => {
    cards[ticker].fundamentals = fundamentals[i]
    cards[ticker].trelloUpdate = consumeFundamentals(ticker, fundamentals[i])
  });

  // Send update requests to trello.
  tickers.forEach((ticker) => {
    const card = cards[ticker];
    const params = {
      name: card.trelloUpdate.name,
      desc: card.trelloUpdate.description
    };
    trello.updateCard(card.id, params);
  });

  verbose && console.log(`\nTimestamp: ${(new Date()).toJSON()}`);
  verbose && console.log(`Total updated: ${tickers.length}`);
};
