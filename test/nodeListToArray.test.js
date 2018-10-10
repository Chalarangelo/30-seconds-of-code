const expect = require('expect');
const {nodeListToArray} = require('./_30s.js');

test('nodeListToArray is a Function', () => {
  expect(nodeListToArray).toBeInstanceOf(Function);
});
