const expect = require('expect');
const pipeFunctions = require('./pipeFunctions.js');


  test('pipeFunctions is a Function', () => {
  expect(pipeFunctions).toBeInstanceOf(Function);
});
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = pipeFunctions(multiply, add5);
  t.equal(multiplyAndAdd5(5, 2), 15, 'Performs left-to-right function composition');
  

