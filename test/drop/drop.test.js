const expect = require('expect');
const drop = require('./drop.js');


  test('drop is a Function', () => {
  expect(drop).toBeInstanceOf(Function);
});
  t.deepEqual(drop([1, 2, 3]), [2,3], 'Works without the last argument');
  t.deepEqual(drop([1, 2, 3], 2), [3], 'Removes appropriate element count as specified');
  t.deepEqual(drop([1, 2, 3], 42), [], 'Empties array given a count greater than length');
  

