const expect = require('expect');
const lcm = require('./lcm.js');


  test('lcm is a Function', () => {
  expect(lcm).toBeInstanceOf(Function);
});
  t.equal(lcm(12, 7), 84, "Returns the least common multiple of two or more numbers.");
  t.equal(lcm(...[1, 3, 4, 5]), 60, "Returns the least common multiple of two or more numbers.");
  
