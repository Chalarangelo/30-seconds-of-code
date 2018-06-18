const expect = require('expect');
const nodeListToArray = require('./nodeListToArray.js');

test('nodeListToArray is a Function', () => {
  expect(nodeListToArray).toBeInstanceOf(Function);
});