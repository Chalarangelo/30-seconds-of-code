const expect = require('expect');
const capitalizeEveryWord = require('./capitalizeEveryWord.js');

test('Testing capitalizeEveryWord', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof capitalizeEveryWord === 'function').toBeTruthy();
  expect(capitalizeEveryWord('hello world!')).toBe('Hello World!');
  expect(capitalizeEveryWord('$# @!')).toBe('$# @!');
  expect(capitalizeEveryWord('a')).toBe('A');
});