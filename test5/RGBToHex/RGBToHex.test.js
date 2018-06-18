const expect = require('expect');
const RGBToHex = require('./RGBToHex.js');

test('Testing RGBToHex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof RGBToHex === 'function').toBeTruthy();
  expect(RGBToHex(255, 165, 1)).toBe('ffa501');
});