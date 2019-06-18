const {isUpperCase} = require('./_30s.js');

test('isUpperCase is a Function', () => {
  expect(isUpperCase).toBeInstanceOf(Function);
});
test('ABC is all upper case', () => {
  expect(isUpperCase('ABC')).toBeTruthy();
});
test('abc is not all upper case', () => {
  expect(isUpperCase('abc')).toBeFalsy();
});
test('A3@$ is all uppercase', () => {
  expect(isUpperCase('A3@$')).toBeTruthy();
});
