const humanize = require('./humanize');

describe('humanize', () => {
  it('should return 0 for 0', () => {
    expect(humanize.humanizeNumber(0)).toEqual('0');
  });

  it('should return 10 for 10', () => {
    expect(humanize.humanizeNumber(10)).toEqual('10');
  });

  it('should return 100 for 100', () => {
    expect(humanize.humanizeNumber(100)).toEqual('100');
  });

  it('should return 1k for 1,000', () => {
    expect(humanize.humanizeNumber(1000)).toEqual('1k');
  });

  it('should return 10k for 10,000', () => {
    expect(humanize.humanizeNumber(10000)).toEqual('10k');
  });

  it('should return 100k for 100,000', () => {
    expect(humanize.humanizeNumber(100000)).toEqual('100k');
  });

  it('should return 1M for 1,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('1M');
  });

  it('should return 10M for 10,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('10M');
  });

  it('should return 100M for 100,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('100M');
  });

  it('should return 1B for 1,000,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('1B');
  });

  it('should return 10B for 10,000,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('10B');
  });

  it('should return 100B for 100,000,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('100B');
  });

  it('should return 1T for 1,000,000,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('1T');
  });

  it('should return 100Q for 1,000,000,000,000', () => {
    expect(humanize.humanizeNumber()).toEqual('100T');
  });
});
