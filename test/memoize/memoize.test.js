const expect = require('expect');
const memoize = require('./memoize.js');


  test('memoize is a Function', () => {
  expect(memoize).toBeInstanceOf(Function);
});
  const f = x => x * x;
  const square = memoize(f);
  t.equal(square(2), 4, 'Function works properly');
  t.equal(square(3), 9, 'Function works properly');
  t.deepEqual(Array.from(square.cache), [[2,4],[3,9]], 'Cache stores values');
  

