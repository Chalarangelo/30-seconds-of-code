const {getDaysDiffBetweenDates} = require('./_30s.js');

test('getDaysDiffBetweenDates is a Function', () => {
  expect(getDaysDiffBetweenDates).toBeInstanceOf(Function);
});
test('Returns the difference in days between two dates', () => {
  expect(getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22'))).toBe(9);
});
