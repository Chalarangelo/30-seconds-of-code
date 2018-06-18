const expect = require('expect');
const pick = require('./pick.js');

test('pick is a Function', () => {
  expect(pick).toBeInstanceOf(Function);
});
test('Picks the key-value pairs corresponding to the given keys from an object.', () => {
  expect(pick({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ 'a': 1, 'c': 3 });
});
