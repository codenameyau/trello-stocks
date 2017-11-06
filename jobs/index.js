require('dotenv').config();
const board = require('./board');

exports.main = () => {
  const PROCESS_HEART_BEAT = 1000 * 60 * 20;
  window.setInterval(() => {}, PROCESS_HEART_BEAT);

  board.updateBoard();
}

if (require.main === module) {
  exports.main();
}
