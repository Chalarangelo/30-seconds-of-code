const expect = require('expect');
const digitize = require('./digitize.js');


  test('digitize is a Function', () => {
  expect(digitize).toBeInstanceOf(Function);
});
  t.deepEqual(digitize(123), [1, 2, 3], "Converts a number to an array of digits");
  
