const {isWeekend} = require('./_30s.js');

test('isWeekend is a Function', () => {
  expect(isWeekend).toBeInstanceOf(Function);
});
test('Returns the correct type', () => {
  expect(typeof isWeekend()).toBe('boolean');
});
const friday = new Date('2019-07-19');
const saturday = new Date('2019-07-20');
test('Returns true', () => {
  expect(isWeekend(friday)).toBe(false);
});
test('Returns false', () => {
  expect(isWeekend(saturday)).toBe(true);
});
