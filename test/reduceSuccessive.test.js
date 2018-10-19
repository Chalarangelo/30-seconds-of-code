const expect = require('expect');
const {reduceSuccessive} = require('./_30s.js');

test('reduceSuccessive is a Function', () => {
  expect(reduceSuccessive).toBeInstanceOf(Function);
});
test('Returns the array of successively reduced values', () => {
  expect(reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0)).toEqual([
    0,
    1,
    3,
    6,
    10,
    15,
    21
  ]);
});
