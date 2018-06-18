const expect = require('expect');
const extendHex = require('./extendHex.js');

test('Testing extendHex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof extendHex === 'function').toBeTruthy();
  expect(extendHex('#03f')).toBe('#0033ff');
  expect(extendHex('05a')).toBe('#0055aa');
});