const expect = require('expect');
const spreadOver = require('./spreadOver.js');


  test('spreadOver is a Function', () => {
  expect(spreadOver).toBeInstanceOf(Function);
});
  const arrayMax = spreadOver(Math.max);
  t.equal(arrayMax([1, 2, 3]), 3, "Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.");
  
