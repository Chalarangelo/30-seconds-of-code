const expect = require('expect');
const findLastKey = require('./findLastKey.js');

test('Testing findLastKey', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof findLastKey === 'function').toBeTruthy();
  expect(findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
)).toBe('pebbles');
});
