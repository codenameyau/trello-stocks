const api = require('./api');
const secret = require('./secret');

const main = async () => {
  const boardLists = await api.getBoardLists(secret.TRELLO_BOARD_ID);
  console.log(boardLists);
};

main();
