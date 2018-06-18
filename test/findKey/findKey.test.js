const expect = require('expect');
const findKey = require('./findKey.js');

test('findKey is a Function', () => {
  expect(findKey).toBeInstanceOf(Function);
});
test('Returns the appropriate key', () => {
  expect(findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']).toBe('barney');
});
