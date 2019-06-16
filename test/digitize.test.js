const {digitize} = require('./_30s.js');

test('digitize is a Function', () => {
  expect(digitize).toBeInstanceOf(Function);
});
test('Converts a number to an array of digits', () => {
  expect(digitize(123)).toEqual([1, 2, 3]);
});
