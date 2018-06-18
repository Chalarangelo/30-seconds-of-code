const expect = require('expect');
const hexToRGB = require('./hexToRGB.js');

test('Testing hexToRGB', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hexToRGB === 'function').toBeTruthy();
  expect(hexToRGB('#27ae60ff')).toBe('rgba(39, 174, 96, 255)');
  expect(hexToRGB('27ae60')).toBe('rgb(39, 174, 96)');
  expect(hexToRGB('#fff')).toBe('rgb(255, 255, 255)');
});