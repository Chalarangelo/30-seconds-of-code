const expect = require('expect');
const solveRPN = require('./solveRPN.js');

test('solveRPN is a Function', () => {
  expect(solveRPN).toBeInstanceOf(Function);
});
