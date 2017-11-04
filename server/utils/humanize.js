exports.humanizeNumber = (value) => {
  const abbrevs = ['K', 'M', 'B', 'T', 'Q'];
  const newValue = String(value);

  if (value < 1000) {
    return newValue;
  }


  // Number is 1,000 -> 1k
  // Number is 1,000,000 -> 1M
  // Number is 100,000,000 -> 100M
  // Number is 1,000,000,000 -> 1B
  // Number is 100,000,000,000 -> 100B
  // Number is 1,000,000,000,000 -> 100T


};
