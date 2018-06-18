const expect = require('expect');
const randomHexColorCode = require('./randomHexColorCode.js');


  test('randomHexColorCode is a Function', () => {
  expect(randomHexColorCode).toBeInstanceOf(Function);
});
  t.equal(randomHexColorCode().length, 7);
  test('The color code starts with "#"', () => {
  expect(randomHexColorCode().startsWith('#')).toBeTruthy();
});
  test('The color code contains only valid hex-digits', () => {
  expect(randomHexColorCode().slice(1).match(/[^0123456789abcdef]/i) === null).toBeTruthy();
});
  

