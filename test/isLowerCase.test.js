const {isLowerCase} = require('./_30s.js');

test('isLowerCase is a Function', () => {
  expect(isLowerCase).toBeInstanceOf(Function);
});
test('passed string is a lowercase', () => {
  expect(isLowerCase('abc')).toBeTruthy();
});
test('passed string is a lowercase', () => {
  expect(isLowerCase('a3@$')).toBeTruthy();
});
test('passed value is not a lowercase', () => {
  expect(isLowerCase('A3@$')).toBeFalsy();
});
