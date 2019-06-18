const {degreesToRads} = require('./_30s.js');

// const approxeq = (v1,v2, diff = 0.001) => Math.abs(v1 - v2) < diff;
test('degreesToRads is a Function', () => {
  expect(degreesToRads).toBeInstanceOf(Function);
});
test('Returns the appropriate value', () => {
  expect(degreesToRads(90.0)).toBeCloseTo(Math.PI / 2, 3);
});
