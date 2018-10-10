const expect = require('expect');
const {toHash} = require('./_30s.js');

test('toHash is a Function', () => {
  expect(toHash).toBeInstanceOf(Function);
});
