const expect = require('expect');
const {sdbm} = require('./_30s.js');

test('sdbm is a Function', () => {
  expect(sdbm).toBeInstanceOf(Function);
});
test('Hashes the input string into a whole number.', () => {
  expect(sdbm('name')).toBe(-3521204949);
});
