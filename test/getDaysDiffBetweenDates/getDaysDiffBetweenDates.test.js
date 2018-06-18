const expect = require('expect');
const getDaysDiffBetweenDates = require('./getDaysDiffBetweenDates.js');


  test('getDaysDiffBetweenDates is a Function', () => {
  expect(getDaysDiffBetweenDates).toBeInstanceOf(Function);
});
  t.equal(getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')), 9, "Returns the difference in days between two dates");
  
