const expect = require('expect');
const mask = require('./mask.js');

test('mask is a Function', () => {
  expect(mask).toBeInstanceOf(Function);
});
test('Replaces all but the last num of characters with the specified mask character', () => {
  expect(mask(1234567890)).toBe('******7890');
});
test('Replaces all but the last num of characters with the specified mask character', () => {
  expect(mask(1234567890, 3)).toBe('*******890');
});
test('Replaces all but the last num of characters with the specified mask character', () => {
  expect(mask(1234567890, -4, '$')).toBe('$$$$567890');
});
