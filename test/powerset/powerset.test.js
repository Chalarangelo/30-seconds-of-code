const expect = require('expect');
const powerset = require('./powerset.js');


  test('powerset is a Function', () => {
  expect(powerset).toBeInstanceOf(Function);
});
  t.deepEqual(powerset([1, 2]), [[], [1], [2], [2,1]], "Returns the powerset of a given array of numbers.");
  
