const expect = require('expect');
const differenceWith = require('./differenceWith.js');


  test('differenceWith is a Function', () => {
  expect(differenceWith).toBeInstanceOf(Function);
});
  t.deepEqual(differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)), [1, 1.2], "Filters out all values from an array");
  
