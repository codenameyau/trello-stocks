const round = exports.round = (number, decimals = 2) => {
  return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

exports.humanizeNumber = (number) => {
  const abbrevs = ['K', 'M', 'B', 'T'];
  const newNumber = String(round(parseFloat(number), 2));

  if (number < 1000) {
    return newNumber;
  }

  return String(number);
};
