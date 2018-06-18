const expect = require('expect');
const symmetricDifferenceWith = require('./symmetricDifferenceWith.js');


  test('symmetricDifferenceWith is a Function', () => {
  expect(symmetricDifferenceWith).toBeInstanceOf(Function);
});
  t.deepEqual(symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
), [1, 1.2, 3.9], 'Returns the symmetric difference between two arrays, using a provided function as a comparator');
  

