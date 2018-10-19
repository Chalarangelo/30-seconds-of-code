const expect = require('expect');
const {squareSum} = require('./_30s.js');

test('squareSum is a Function', () => {
  expect(squareSum).toBeInstanceOf(Function);
});
