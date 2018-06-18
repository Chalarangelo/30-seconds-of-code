const expect = require('expect');
const unfold = require('./unfold.js');


  test('unfold is a Function', () => {
  expect(unfold).toBeInstanceOf(Function);
});
  var f = n => (n > 50 ? false : [-n, n + 10]);
  t.deepEqual(unfold(f, 10), [-10, -20, -30, -40, -50], 'Works with a given function, producing an array');
  

