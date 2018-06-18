const expect = require('expect');
const findLastKey = require('./findLastKey.js');

test('findLastKey is a Function', () => {
  expect(findLastKey).toBeInstanceOf(Function);
});
test('eturns the appropriate key', () => {
  expect(findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']).toBe('pebbles');
});
