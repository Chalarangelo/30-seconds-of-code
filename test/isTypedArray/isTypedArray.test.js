const expect = require('expect');
const isTypedArray = require('./isTypedArray.js');

test('isTypedArray is a Function', () => {
  expect(isTypedArray).toBeInstanceOf(Function);
});
