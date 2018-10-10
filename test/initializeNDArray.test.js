const expect = require('expect');
const {initializeNDArray} = require('./_30s.js');

test('initializeNDArray is a Function', () => {
  expect(initializeNDArray).toBeInstanceOf(Function);
});
