const expect = require('expect');
const {heronArea} = require('./_30s.js');

test('heronArea is a Function', () => {
  expect(heronArea).toBeInstanceOf(Function);
});
test('howManyTimes returns the correct result', () => {
  expect(heronArea(3, 4, 5)).toBe(6);
});
