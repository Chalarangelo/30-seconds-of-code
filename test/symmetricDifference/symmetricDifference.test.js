const expect = require('expect');
const symmetricDifference = require('./symmetricDifference.js');


  test('symmetricDifference is a Function', () => {
  expect(symmetricDifference).toBeInstanceOf(Function);
});
  t.deepEqual(symmetricDifference([1, 2, 3], [1, 2, 4]), [3, 4], "Returns the symmetric difference between two arrays.");
  
