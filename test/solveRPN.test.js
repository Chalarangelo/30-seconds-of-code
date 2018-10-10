const expect = require('expect');
const {solveRPN} = require('./_30s.js');

test('solveRPN is a Function', () => {
  expect(solveRPN).toBeInstanceOf(Function);
});
