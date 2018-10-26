const expect = require('expect');
const {solveRPN} = require('./_30s.js');

test('solveRPN is a Function', () => {
  expect(solveRPN).toBeInstanceOf(Function);
});
test('solveRPN returns the correct result', () => {
  expect(solveRPN('15 7 1 1 + - / 3 * 2 1 1 + + -')).toBe(5);
});
test('solveRPN returns the correct result', () => {
  expect(solveRPN('2 3 ^')).toBe(8);
});
