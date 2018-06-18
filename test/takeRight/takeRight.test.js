const expect = require('expect');
const takeRight = require('./takeRight.js');


  test('takeRight is a Function', () => {
  expect(takeRight).toBeInstanceOf(Function);
});
  t.deepEqual(takeRight([1, 2, 3], 2), [2, 3], "Returns an array with n elements removed from the end");
  t.deepEqual(takeRight([1, 2, 3]), [3], "Returns an array with n elements removed from the end");
  
