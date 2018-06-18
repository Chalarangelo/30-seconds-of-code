const expect = require('expect');
const countOccurrences = require('./countOccurrences.js');


  test('countOccurrences is a Function', () => {
  expect(countOccurrences).toBeInstanceOf(Function);
});
  t.deepEqual(countOccurrences([1, 1, 2, 1, 2, 3], 1), 3, "Counts the occurrences of a value in an array");
  
