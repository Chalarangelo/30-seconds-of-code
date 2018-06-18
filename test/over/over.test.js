const expect = require('expect');
const over = require('./over.js');


  test('over is a Function', () => {
  expect(over).toBeInstanceOf(Function);
});
  const minMax = over(Math.min, Math.max);
  t.deepEqual(minMax(1, 2, 3, 4, 5), [1,5], 'Applies given functions over multiple arguments');
  

