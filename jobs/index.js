require('dotenv').config();
const board = require('./board');

exports.main = () => {
  board.updateBoard();
}

if (require.main === module) {
  exports.main();
}
