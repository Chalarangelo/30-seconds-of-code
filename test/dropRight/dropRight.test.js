const expect = require('expect');
const dropRight = require('./dropRight.js');


  test('dropRight is a Function', () => {
  expect(dropRight).toBeInstanceOf(Function);
});
  t.deepEqual(dropRight([1, 2, 3]), [1,2], "Returns a new array with n elements removed from the right");
  t.deepEqual(dropRight([1, 2, 3], 2), [1], "Returns a new array with n elements removed from the right");
  t.deepEqual(dropRight([1, 2, 3], 42), [], "Returns a new array with n elements removed from the right");
  
