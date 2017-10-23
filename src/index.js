const api = require('./api');
const secret = require('./secret');


/********************************************************************
* UTILS
********************************************************************/
const round = exports.round = (num, precision = 2) => {
  if (num == null) { return 'N/A' };
  return parseFloat(num).toFixed(precision);
};

const abbreviateNumber = exports.abbreviateNumber = (value) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) { break; }
    }
    if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

const formatTitle = exports.formatTitle = (ticker, fundamentals) => {
  const priceHigh = round(fundamentals.high, 2);
  const peRatio = round(fundamentals.pe_ratio, 2);
  return `${ticker} - $${priceHigh} (P/E: ${peRatio})`;
};

const formatDescription = exports.formatDescription = (fundamentals) => {
  const employees = fundamentals.num_employees == null ? 'N/A' : fundamentals.num_employees;
  const founded = fundamentals.year_founded
  const marketCap = abbreviateNumber(parseFloat(fundamentals.market_cap));
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
