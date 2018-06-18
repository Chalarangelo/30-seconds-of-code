const expect = require('expect');
const hexToRGB = require('./hexToRGB.js');


  test('hexToRGB is a Function', () => {
  expect(hexToRGB).toBeInstanceOf(Function);
});
  test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('#27ae60ff'), 'rgba(39, 174, 96).toBe(255)')
});
  test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('27ae60'), 'rgb(39, 174).toBe(96)')
});
  test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('#fff'), 'rgb(255, 255).toBe(255)')
});
  
