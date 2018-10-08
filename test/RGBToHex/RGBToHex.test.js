const expect = require('expect');
const RGBToHex = require('./RGBToHex.js');

test('RGBToHex is a Function', () => {
  expect(RGBToHex).toBeInstanceOf(Function);
});
test('Converts the values of RGB components to a color code.', () => {
  expect(RGBToHex(255, 165, 1)).toBe('ffa501');
});
