const expect = require('expect');
const everyNth = require('./everyNth.js');


  test('everyNth is a Function', () => {
  expect(everyNth).toBeInstanceOf(Function);
});
  t.deepEqual(everyNth([1, 2, 3, 4, 5, 6], 2), [ 2, 4, 6 ], "Returns every nth element in an array");
  
