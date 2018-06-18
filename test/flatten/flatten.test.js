const expect = require('expect');
const flatten = require('./flatten.js');


  test('flatten is a Function', () => {
  expect(flatten).toBeInstanceOf(Function);
});
  t.deepEqual(flatten([1, [2], 3, 4]), [1, 2, 3, 4], "Flattens an array");
  t.deepEqual(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2), [1, 2, 3, [4, 5], 6, 7, 8], "Flattens an array");
  
