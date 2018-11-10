const expect = require('expect');
const {nodeListToArray} = require('./_30s.js');

test('nodeListToArray is a Function', () => {
  expect(nodeListToArray).toBeInstanceOf(Function);
});
test('nodeListToArray returns an array of proper length', () => {
  expect(nodeListToArray(document.childNodes).length).toBe(2);
});
