const expect = require('expect');
const mphToKph = require('./mphToKph.js');

test('mphToKph is a Function', () => {
  expect(mphToKph).toBeInstanceOf(Function);
});
test('Returns kph from mph.', () => {
  expect(mphToKph(10)).toBe(16.09344000614692);
});
test('Returns kph from mph.', () => {
  expect(mphToKph(85.9)).toBe(138.24264965280207);
});
