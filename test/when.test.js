const {when} = require('./_30s.js');

test('when is a Function', () => {
  expect(when).toBeInstanceOf(Function);
});
const doubleEvenNumbers = when(x => x % 2 === 0, x => x * 2);
test('Returns the proper result', () => {
  expect(doubleEvenNumbers(2)).toBe(4);
});
test('Returns the proper result', () => {
  expect(doubleEvenNumbers(1)).toBe(1);
});
