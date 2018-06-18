const expect = require('expect');
const negate = require('./negate.js');


  test('negate is a Function', () => {
  expect(negate).toBeInstanceOf(Function);
});
  t.deepEqual([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)), [1, 3, 5], "Negates a predicate function");
  

