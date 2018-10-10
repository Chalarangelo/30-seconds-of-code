const expect = require('expect');
const {factors} = require('./_30s.js');

test('factors is a Function', () => {
  expect(factors).toBeInstanceOf(Function);
});
