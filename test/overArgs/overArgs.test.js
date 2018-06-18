const expect = require('expect');
const overArgs = require('./overArgs.js');


  test('overArgs is a Function', () => {
  expect(overArgs).toBeInstanceOf(Function);
});
  const square = n => n * n;
  const double = n => n * 2;
  const fn = overArgs((x, y) => [x, y], [square, double]);
  t.deepEqual(fn(9, 3), [81, 6], 'Invokes the provided function with its arguments transformed');
  

