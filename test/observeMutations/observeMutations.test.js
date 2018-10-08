const expect = require('expect');
const observeMutations = require('./observeMutations.js');

test('observeMutations is a Function', () => {
  expect(observeMutations).toBeInstanceOf(Function);
});
