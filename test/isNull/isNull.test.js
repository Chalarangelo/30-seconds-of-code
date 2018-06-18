const expect = require('expect');
const isNull = require('./isNull.js');


  test('isNull is a Function', () => {
  expect(isNull).toBeInstanceOf(Function);
});
  t.equal(isNull(null), true, "passed argument is a null");
  t.equal(isNull(NaN), false, "passed argument is a null");
  
