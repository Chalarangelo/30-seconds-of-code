const expect = require('expect');
const indexOfAll = require('./indexOfAll.js');


  test('indexOfAll is a Function', () => {
  expect(indexOfAll).toBeInstanceOf(Function);
});
  t.deepEqual(indexOfAll([1, 2, 3, 1, 2, 3], 1), [0,3], "Returns all indices of val in an array");
  t.deepEqual(indexOfAll([1, 2, 3], 4), [], "Returns all indices of val in an array");
  
