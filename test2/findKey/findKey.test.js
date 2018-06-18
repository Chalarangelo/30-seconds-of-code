const expect = require('expect');
const findKey = require('./findKey.js');

test('Testing findKey', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof findKey === 'function').toBeTruthy();
  expect(findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
)).toEqual('barney');
});
