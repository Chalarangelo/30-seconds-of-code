const expect = require('expect');
const objectFromPairs = require('./objectFromPairs.js');

test('objectFromPairs is a Function', () => {
  expect(objectFromPairs).toBeInstanceOf(Function);
});
  test('Creates an object from the given key-value pairs.', () => {
  expect(objectFromPairs([['a', 1], ['b', 2]])).toEqual({a: 1, b: 2});
});
