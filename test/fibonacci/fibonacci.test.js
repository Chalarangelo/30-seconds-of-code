const expect = require('expect');
const fibonacci = require('./fibonacci.js');


  test('fibonacci is a Function', () => {
  expect(fibonacci).toBeInstanceOf(Function);
});
  t.deepEqual(fibonacci(6), [0, 1, 1, 2, 3, 5], "Generates an array, containing the Fibonacci sequence");
  
