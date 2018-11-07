const expect = require('expect');
const {mostPerformant} = require('./_30s.js');

test('mostPerformant is a Function', () => {
  expect(mostPerformant).toBeInstanceOf(Function);
});
test('mostPerformant returns a number', () => {
  expect(typeof mostPerformant([Math.max, Math.min])).toBe('number');
});
test('mostPerformant returns a number', () => {
  expect(typeof mostPerformant([Math.max, Math.min], 10)).toBe('number');
});
