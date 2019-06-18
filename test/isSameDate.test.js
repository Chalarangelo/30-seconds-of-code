const {isSameDate} = require('./_30s.js');

test('isSameDate is a Function', () => {
  expect(isSameDate).toBeInstanceOf(Function);
});
test('isSameDate produces the correct result', () => {
  expect(isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20))).toBeTruthy();
});
test('isSameDate produces the correct result', () => {
  expect(isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 21))).toBeFalsy();
});
