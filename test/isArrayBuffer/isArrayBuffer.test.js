const expect = require('expect');
const isArrayBuffer = require('./isArrayBuffer.js');


  test('isArrayBuffer is a Function', () => {
  expect(isArrayBuffer).toBeInstanceOf(Function);
});
  
