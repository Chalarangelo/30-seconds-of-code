const expect = require('expect');
const mask = require('./mask.js');

test('Testing mask', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof mask === 'function').toBeTruthy();
  expect(mask(1234567890)).toBe('******7890');
  expect(mask(1234567890, 3)).toBe('*******890');
  expect(mask(1234567890, -4, '$')).toBe('$$$$567890');
});