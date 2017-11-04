const humanize = require('./humanize');

describe('round', () => {
  it('should return 0 for 0', () => {
    expect(humanize.round(0)).toEqual(0);
  });

  it('should return -1 for -1', () => {
    expect(humanize.round(-1)).toEqual(-1);
  });

  it('should return 1 for 1', () => {
    expect(humanize.round(1)).toEqual(1);
  });

  it('should return -1.5 for -1.5', () => {
    expect(humanize.round(-1.5)).toEqual(-1.5);
  });

  it('should return 1.5 for 1.5', () => {
    expect(humanize.round(1.5)).toEqual(1.5);
  });

  it('should return -1.55 for -1.55', () => {
    expect(humanize.round(-1.55)).toEqual(-1.55);
  });

  it('should return 1.55 for 1.55', () => {
    expect(humanize.round(1.55)).toEqual(1.55);
  });

  // Requires verification
  it('should return -1.55 for -1.555', () => {
    expect(humanize.round(-1.555)).toEqual(-1.55);
  });

  it('should return 1.56 for 1.555', () => {
    expect(humanize.round(1.555)).toEqual(1.56);
  });
});

describe('humanizeNumber', () => {
  it('should return 0 for 0', () => {
    expect(humanize.humanizeNumber(0)).toEqual('0');
  });

  it('should return 1.55 for 1.55', () => {
    expect(humanize.humanizeNumber(1.55)).toEqual('1.55');
  });

  it('should return 1.56 for 1.555', () => {
    expect(humanize.humanizeNumber(1.555)).toEqual('1.56');
  });

  it('should return 10 for 10', () => {
    expect(humanize.humanizeNumber(10)).toEqual('10');
  });

  it('should return 100 for 100', () => {
    expect(humanize.humanizeNumber(100)).toEqual('100');
  });

  it('should return 1k for 1000', () => {
    expect(humanize.humanizeNumber(1000)).toEqual('1k');
  });

  it('should return 1.5k for 1500', () => {
    expect(humanize.humanizeNumber(1500)).toEqual('1.5k');
  });

  it('should return 10k for 10000', () => {
    expect(humanize.humanizeNumber(10000)).toEqual('10k');
  });

  it('should return 100k for 100000', () => {
    expect(humanize.humanizeNumber(100000)).toEqual('100k');
  });

  it('should return 1M for 1000000', () => {
    expect(humanize.humanizeNumber(1000000)).toEqual('1M');
  });

  it('should return 10M for 10000000', () => {
    expect(humanize.humanizeNumber(10000000)).toEqual('10M');
  });

  it('should return 100M for 100000000', () => {
    expect(humanize.humanizeNumber(100000000)).toEqual('100M');
  });

  it('should return 1B for 1000000000', () => {
    expect(humanize.humanizeNumber(1000000000)).toEqual('1B');
  });

  it('should return 10B for 10000000000', () => {
    expect(humanize.humanizeNumber(10000000000)).toEqual('10B');
  });

  it('should return 100B for 100000000000', () => {
    expect(humanize.humanizeNumber(100000000000)).toEqual('100B');
  });

  it('should return 1T for 1000000000000', () => {
    expect(humanize.humanizeNumber(1000000000000)).toEqual('1T');
  });
});
