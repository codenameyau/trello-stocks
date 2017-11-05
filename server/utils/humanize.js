const round = exports.round = (number, decimals = 2) => {
  return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

exports.humanizeNumber = (number) => {
  let newNumber = String(round(parseFloat(number), 2));
  let absoluteValue = Math.abs(newNumber);

  if (absoluteValue < 1000) {
    return newNumber;
  }

  newNumber = newNumber.split('.')[0];
  const abbrevs = ['', 'K', 'M', 'B', 'T', 'Q'];
  let sign = '';

  if (newNumber[0] === '-') {
    sign = '-';
    newNumber = newNumber.replace(/\-/g, '');
  }

  const length = newNumber.length;
  const bucket = Math.floor((length - 1) / 3);
  const lastDigit = (length - bucket * 3);
  let humanizedNumber = newNumber.slice(0, lastDigit);

  if (absoluteValue < 10000) {
    const extraDigit = newNumber.slice(lastDigit, lastDigit + 1);
    if (extraDigit > 0) {
      humanizedNumber += `.${extraDigit}`;
    }
  }

  const suffix = abbrevs[bucket];
  if (suffix === undefined) {
    throw new RangeError('Number is too large to humanize');
  }

  return sign + humanizedNumber + suffix;
};
