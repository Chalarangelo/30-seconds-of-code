const expect = require('expect');
const {elementContains} = require('./_30s.js');

test('elementContains is a Function', () => {
  expect(elementContains).toBeInstanceOf(Function);
});
