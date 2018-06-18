const expect = require('expect');
const median = require('./median.js');


  test('median is a Function', () => {
  expect(median).toBeInstanceOf(Function);
});
  t.equal(median([5, 6, 50, 1, -5]), 5, "Returns the median of an array of numbers");
  t.equal(median([1, 2, 3]), 2, "Returns the median of an array of numbers");
  
