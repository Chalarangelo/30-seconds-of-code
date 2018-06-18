const expect = require('expect');
const capitalizeEveryWord = require('./capitalizeEveryWord.js');

test('capitalizeEveryWord is a Function', () => {
  expect(capitalizeEveryWord).toBeInstanceOf(Function);
});
test('Capitalizes the first letter of every word in a string', () => {
  expect(capitalizeEveryWord('hello world!')).toBe('Hello World!');
});
test('Works with characters', () => {
  expect(capitalizeEveryWord('$# @!')).toBe('$# @!');
});
test('Works with one word string', () => {
  expect(capitalizeEveryWord('a')).toBe('A');
});
