import {
  hasKey,
  hasKeys,
  get
} from './object';

describe('hasKey', () => {
  it('returns the correct result for a regular key', () => {
    expect(hasKey({ a: 'yes' }, ['a'])).toEqual(true);
  });
  it('returns the correct result for a regular key', () => {
    expect(hasKey({ a: 'yes' }, ['b'])).toEqual(false);
  });

  it('returns the correct result for nested keys', () => {
    expect(hasKey({ a: { b: { c: 'yes'} } }, ['a', 'b', 'c'])).toEqual(true);
  });

  it('returns the correct result for non-objects', () => {
    expect(hasKey('nope', ['a'])).toEqual(false);
  });
});

describe('hasKeys', () => {
  it('returns the correct result for the given keys', () => {
    expect(hasKeys(
      { a: { b: { c: 'yes'}, d: 1 }, e: true },
      ['e', ['a', 'b'], 'a']
    )).toEqual(true);
  });
});

describe('get', () => {
  it('returns the correct result for the given keys', () => {
    expect(get(
      { a: { b: { c: 'yes'}, d: 1 }, e: true },
      ['e', ['a', 'b', 'c'], ['a', 'd']]
    )).toEqual([true, 'yes', 1]);
  });
});
