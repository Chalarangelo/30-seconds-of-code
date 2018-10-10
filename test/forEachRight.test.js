const expect = require('expect');
const {forEachRight} = require('./_30s.js');

test('forEachRight is a Function', () => {
  expect(forEachRight).toBeInstanceOf(Function);
});
let output = '';
forEachRight([1, 2, 3, 4], val => (output += val));
test('Iterates over the array in reverse', () => {
  expect(output).toBe('4321');
});
