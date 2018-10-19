const expect = require('expect');
const {mapKeys} = require('./_30s.js');

test('mapKeys is a Function', () => {
  expect(mapKeys).toBeInstanceOf(Function);
});
test('Maps keys', () => {
  expect(mapKeys({ a: 1, b: 2 }, (val, key) => key + val)).toEqual({ a1: 1, b2: 2 });
});
