const expect = require('expect');
const sortCharactersInString = require('./sortCharactersInString.js');

test('Testing sortCharactersInString', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sortCharactersInString === 'function').toBeTruthy();
  expect(sortCharactersInString('cabbage')).toBe('aabbceg');
});