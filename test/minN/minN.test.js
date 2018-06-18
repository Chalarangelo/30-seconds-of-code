const expect = require('expect');
const minN = require('./minN.js');


  test('minN is a Function', () => {
  expect(minN).toBeInstanceOf(Function);
});
  t.deepEqual(minN([1, 2, 3]), [1], "Returns the n minimum elements from the provided array");
  t.deepEqual(minN([1, 2, 3], 2), [1, 2], "Returns the n minimum elements from the provided array");
  
