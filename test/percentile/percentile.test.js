const expect = require('expect');
const percentile = require('./percentile.js');


  test('percentile is a Function', () => {
  expect(percentile).toBeInstanceOf(Function);
});
  t.equal(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6), 55, "Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.");
  
