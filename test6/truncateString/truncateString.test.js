const expect = require('expect');
const truncateString = require('./truncateString.js');

test('Testing truncateString', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof truncateString === 'function').toBeTruthy();
  expect(truncateString('boomerang', 7)).toBe('boom...');
});