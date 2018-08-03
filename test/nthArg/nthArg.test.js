const expect = require('expect');
const nthArg = require('./nthArg.js');

test('nthArg is a Function', () => {
  expect(nthArg).toBeInstanceOf(Function);
});
const third = nthArg(2);
test('Returns the nth argument', () => {
  expect(third(1, 2, 3)).toBe(3);
});
test('Returns undefined if arguments too few', () => {
  expect(third(1, 2)).toBe(undefined);
});
const last = nthArg(-1);
test('Works for negative values', () => {
  expect(last(1, 2, 3, 4, 5)).toBe(5);
});
