const expect = require('expect');
const times = require('./times.js');


  test('times is a Function', () => {
  expect(times).toBeInstanceOf(Function);
});
  var output = '';
  times(5, i => (output += i));
  test('Runs a function the specified amount of times', () => {
  expect(output, '01234').toBe()
});
  

