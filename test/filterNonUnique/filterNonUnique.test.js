const expect = require('expect');
const filterNonUnique = require('./filterNonUnique.js');


  test('filterNonUnique is a Function', () => {
  expect(filterNonUnique).toBeInstanceOf(Function);
});
  t.deepEqual(filterNonUnique([1, 2, 2, 3, 4, 4, 5]), [1,3,5], "Filters out the non-unique values in an array");
  
