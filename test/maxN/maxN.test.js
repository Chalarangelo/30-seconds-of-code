const expect = require('expect');
const maxN = require('./maxN.js');


  test('maxN is a Function', () => {
  expect(maxN).toBeInstanceOf(Function);
});
  t.deepEqual(maxN([1, 2, 3]), [3], "Returns the n maximum elements from the provided array");
  t.deepEqual(maxN([1, 2, 3], 2), [3, 2], "Returns the n maximum elements from the provided array");
  
