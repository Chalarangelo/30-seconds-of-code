const expect = require('expect');
const {midpoint} = require('./_30s.js');

test('midpoint is a Function', () => {
  expect(midpoint).toBeInstanceOf(Function);
});

test('midpoint(2, 2, 4, 4) = [3, 3]', () => {
  expect(midpoint(2, 2, 4, 4)).toEqual([3, 3])
});

test('midpoint(4, 4, 6, 6) = [5,5]', () => {
  expect(midpoint(4, 4, 6, 6)).toEqual([5, 5])
});

test('midpoint(1, 3, 2, 4) = [3,3]', () => {
  expect(midpoint(1, 3, 2, 4)).toEqual([1.5, 3.5])
});

test('midpoint(-2, 0, -2, 4) = [-2,2]', () => {
  expect(midpoint(-2, 0, -2, 4)).toEqual([-2, 2])
});

test('midpoint(0, 0, 0, 0) = [0,0]', () => {
  expect(midpoint(0, 0, 0, 0)).toEqual([0, 0])
});

test('midpoint(10, -10, 20, 30) = [15, 10]', () => {
  expect(midpoint(10, -10, 20, 30)).toEqual([15, 10])
});

test('midpoint(7.5, -1.3, 2.7, 11.1) = [5.1, 4.8999999999999995]', () => {
  expect(midpoint(7.5, -1.3, 2.7, 11.1)).toEqual([5.1, 4.8999999999999995])
});

