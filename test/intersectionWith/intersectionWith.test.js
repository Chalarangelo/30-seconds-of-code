const expect = require('expect');
const intersectionWith = require('./intersectionWith.js');


  test('intersectionWith is a Function', () => {
  expect(intersectionWith).toBeInstanceOf(Function);
});
  t.deepEqual(intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)), [1.5, 3, 0], 'Returns a list of elements that exist in both arrays, using a provided comparator function');
  

