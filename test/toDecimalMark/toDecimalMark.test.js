const expect = require('expect');
const toDecimalMark = require('./toDecimalMark.js');


  test('toDecimalMark is a Function', () => {
  expect(toDecimalMark).toBeInstanceOf(Function);
});
  t.equal(toDecimalMark(12305030388.9087), "12,305,030,388.909", "convert a float-point arithmetic to the Decimal mark form");
  
