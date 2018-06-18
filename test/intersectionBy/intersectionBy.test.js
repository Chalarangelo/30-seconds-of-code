const expect = require('expect');
const intersectionBy = require('./intersectionBy.js');


  test('intersectionBy is a Function', () => {
  expect(intersectionBy).toBeInstanceOf(Function);
});
  t.deepEqual(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor), [2.1], 'Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both');
  

