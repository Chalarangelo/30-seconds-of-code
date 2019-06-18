const {unfold} = require('./_30s.js');

test('unfold is a Function', () => {
  expect(unfold).toBeInstanceOf(Function);
});
var f = n => (n > 50 ? false : [-n, n + 10]);
test('Works with a given function, producing an array', () => {
  expect(unfold(f, 10)).toEqual([-10, -20, -30, -40, -50]);
});
