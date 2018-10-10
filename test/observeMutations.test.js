const expect = require('expect');
const {observeMutations} = require('./_30s.js');

test('observeMutations is a Function', () => {
  expect(observeMutations).toBeInstanceOf(Function);
});
