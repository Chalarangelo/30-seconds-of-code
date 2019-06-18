const {isBeforeDate} = require('./_30s.js');

test('isBeforeDate is a Function', () => {
  expect(isBeforeDate).toBeInstanceOf(Function);
});
test('isBeforeDate produces the correct result', () => {
  expect(isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21))).toBeTruthy();
});
test('isBeforeDate produces the correct result', () => {
  expect(isBeforeDate(new Date(2010, 10, 21), new Date(2010, 10, 20))).toBeFalsy();
});

