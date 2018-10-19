const expect = require('expect');
const {mphToKmph} = require('./_30s.js');

test('mphToKmph is a Function', () => {
  expect(mphToKmph).toBeInstanceOf(Function);
});
test('Returns kph from mph.', () => {
  expect(mphToKmph(10)).toBe(16.09344000614692);
});
