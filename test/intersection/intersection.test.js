const expect = require('expect');
const intersection = require('./intersection.js');


  test('intersection is a Function', () => {
  expect(intersection).toBeInstanceOf(Function);
});
  t.deepEqual(intersection([1, 2, 3], [4, 3, 2]), [2, 3], "Returns a list of elements that exist in both arrays");
  
