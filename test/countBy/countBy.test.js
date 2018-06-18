const expect = require('expect');
const countBy = require('./countBy.js');


  test('countBy is a Function', () => {
  expect(countBy).toBeInstanceOf(Function);
});
  t.deepEqual(countBy([6.1, 4.2, 6.3], Math.floor), {4: 1, 6: 2}, 'Works for functions');
  t.deepEqual(countBy(['one', 'two', 'three'], 'length'), {3: 2, 5: 1}, 'Works for property names');
  

