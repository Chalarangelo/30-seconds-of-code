const expect = require('expect');
const sortedIndex = require('./sortedIndex.js');


  test('sortedIndex is a Function', () => {
  expect(sortedIndex).toBeInstanceOf(Function);
});
  t.equal(sortedIndex([5, 3, 2, 1], 4), 1, "Returns the lowest index at which value should be inserted into array in order to maintain its sort order.");
  t.equal(sortedIndex([30, 50], 40), 1, "Returns the lowest index at which value should be inserted into array in order to maintain its sort order.");
  
