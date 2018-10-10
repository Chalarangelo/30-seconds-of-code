const expect = require('expect');
const {cloneRegExp} = require('./_30s.js');

test('cloneRegExp is a Function', () => {
  expect(cloneRegExp).toBeInstanceOf(Function);
});
const rgTest = /./g;
test('Clones regular expressions properly', () => {
  expect(cloneRegExp(rgTest)).not.toBe(rgTest);
});
