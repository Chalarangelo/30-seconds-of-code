const expect = require('expect');
const {midpoint} = require('./_30s.js');

test('midpoint is a Function', () => {
  expect(midpoint).toBeInstanceOf(Function);
});

test('midpoint(2,2,4,4) = [3,3]', () => {
  expect(midpoint(2,2,4,4)).toEqual([3,3])
});

test('midpoint(4, 4, 6, 6) = [5,5]', () => {
  expect(midpoint(4, 4, 6, 6)).toEqual([5,5])
});

test('midpoint(1, 3, 2, 4) = [3,3]', () => {
  expect(midpoint(1, 3, 2, 4)).toEqual([1.5,3.5])
});
