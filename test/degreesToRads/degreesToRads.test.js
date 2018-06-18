const expect = require('expect');
const degreesToRads = require('./degreesToRads.js');


  const approxeq = (v1,v2, diff = 0.001) => Math.abs(v1 - v2) < diff;
  test('degreesToRads is a Function', () => {
  expect(degreesToRads).toBeInstanceOf(Function);
});
  test('Returns the appropriate value', () => {
  expect(approxeq(degreesToRads(90.0), Math.PI / 2)).toBeTruthy();
});
  

