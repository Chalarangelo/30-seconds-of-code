const expect = require('expect');
const standardDeviation = require('./standardDeviation.js');


  test('standardDeviation is a Function', () => {
  expect(standardDeviation).toBeInstanceOf(Function);
});
  t.equal(standardDeviation([10, 2, 38, 23, 38, 23, 21]), 13.284434142114991, "Returns the standard deviation of an array of numbers");
  t.equal(standardDeviation([10, 2, 38, 23, 38, 23, 21], true), 12.29899614287479, "Returns the standard deviation of an array of numbers");
  
