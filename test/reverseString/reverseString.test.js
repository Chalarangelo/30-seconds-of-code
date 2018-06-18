const expect = require('expect');
const reverseString = require('./reverseString.js');

test('reverseString is a Function', () => {
  expect(reverseString).toBeInstanceOf(Function);
});
test('Reverses a string.', () => {
  expect(reverseString('foobar')).toBe('raboof');
});
