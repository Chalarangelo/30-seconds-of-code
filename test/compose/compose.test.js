const expect = require('expect');
const compose = require('./compose.js');


  test('compose is a Function', () => {
  expect(compose).toBeInstanceOf(Function);
});
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = compose(add5, multiply);
  t.equal(multiplyAndAdd5(5, 2), 15, "Performs right-to-left function composition");
  
