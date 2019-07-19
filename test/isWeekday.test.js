const {isWeekday} = require('./_30s.js');

test('isWeekDay is a Function', () => {
  expect(isWeekday).toBeInstanceOf(Function);
});
test('Returns the correct type', () => {
  expect(typeof isWeekday()).toBe('boolean');
});
const friday = new Date('2019-07-19');
const saturday = new Date('2019-07-20');
test('Returns true', () => {
  expect(isWeekday(friday)).toBe(true);
});
test('Returns false', () => {
  expect(isWeekday(saturday)).toBe(false);
});
