const expect = require('expect');
const toOrdinalSuffix = require('./toOrdinalSuffix.js');


  test('toOrdinalSuffix is a Function', () => {
  expect(toOrdinalSuffix).toBeInstanceOf(Function);
});
  t.equal(toOrdinalSuffix('123'), '123rd', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(5), '5th', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(1), '1st', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(0), '0th', 'Adds an ordinal suffix to a number');
  
