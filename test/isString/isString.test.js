const expect = require('expect');
const isString = require('./isString.js');


  test('isString is a Function', () => {
  expect(isString).toBeInstanceOf(Function);
});
  t.equal(isString('foo'), true, 'foo is a string');
  t.equal(isString('10'), true, '"10" is a string');
  t.equal(isString(''), true, 'Empty string is a string');
  t.equal(isString(10), false, '10 is not a string');
  t.equal(isString(true), false, 'true is not string');
  
