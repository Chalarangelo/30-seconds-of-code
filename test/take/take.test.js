const expect = require('expect');
const take = require('./take.js');


  test('take is a Function', () => {
  expect(take).toBeInstanceOf(Function);
});
  t.deepEqual(take([1, 2, 3], 5), [1, 2, 3], "Returns an array with n elements removed from the beginning.");
  t.deepEqual(take([1, 2, 3], 0), [], "Returns an array with n elements removed from the beginning.");
  

