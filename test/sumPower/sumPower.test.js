const expect = require('expect');
const sumPower = require('./sumPower.js');


  test('sumPower is a Function', () => {
  expect(sumPower).toBeInstanceOf(Function);
});
  t.equal(sumPower(10), 385, "Returns the sum of the powers of all the numbers from start to end");
  t.equal(sumPower(10, 3), 3025, "Returns the sum of the powers of all the numbers from start to end");
  t.equal(sumPower(10, 3, 5), 2925, "Returns the sum of the powers of all the numbers from start to end");
  
