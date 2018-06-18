const expect = require('expect');
const isNumber = require('./isNumber.js');


  test('isNumber is a Function', () => {
  expect(isNumber).toBeInstanceOf(Function);
});
  t.equal(isNumber(1), true, "passed argument is a number");
  t.equal(isNumber('1'), false, "passed argument is not a number");
  
