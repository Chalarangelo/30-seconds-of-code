const expect = require('expect');
const difference = require('./difference.js');


  test('difference is a Function', () => {
  expect(difference).toBeInstanceOf(Function);
});
  t.deepEqual(difference([1, 2, 3], [1, 2, 4]), [3], "Returns the difference between two arrays");
  
