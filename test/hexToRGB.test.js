const {hexToRGB} = require('./_30s.js');

test('hexToRGB is a Function', () => {
  expect(hexToRGB).toBeInstanceOf(Function);
});
test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('#27ae60ff')).toBe('rgba(39, 174, 96, 255)');
});
test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('27ae60')).toBe('rgb(39, 174, 96)');
});
test('Converts a color code to a rgb() or rgba() string', () => {
  expect(hexToRGB('#fff')).toBe('rgb(255, 255, 255)');
});
