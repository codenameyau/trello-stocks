const script = require('../server/scripts/update-board');

exports.updateBoard = () => {
  const JOB_TIMEOUT = 1000 * 60 * 60 * 24;

  setInterval(() => {
    script.updateCardTickers(true);
  }, JOB_TIMEOUT);
};
