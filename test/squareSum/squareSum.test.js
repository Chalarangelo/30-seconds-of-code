const expect = require('expect');
const squareSum = require('./squareSum.js');

test('squareSum is a Function', () => {
  expect(squareSum).toBeInstanceOf(Function);
});
