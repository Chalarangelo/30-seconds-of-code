const expect = require('expect');
const hexToRGB = require('./hexToRGB.js');


  test('hexToRGB is a Function', () => {
  expect(hexToRGB).toBeInstanceOf(Function);
});
  t.equal(hexToRGB('#27ae60ff'), 'rgba(39, 174, 96, 255)', "Converts a color code to a rgb() or rgba() string");
  t.equal(hexToRGB('27ae60'), 'rgb(39, 174, 96)', "Converts a color code to a rgb() or rgba() string");
  t.equal(hexToRGB('#fff'), 'rgb(255, 255, 255)', "Converts a color code to a rgb() or rgba() string");
  
