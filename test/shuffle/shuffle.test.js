const expect = require('expect');
const shuffle = require('./shuffle.js');

test('shuffle is a Function', () => {
  expect(shuffle).toBeInstanceOf(Function);
});
const arr = [1, 2, 3, 4, 5, 6];
test('Shuffles the array', () => {
  expect(shuffle(arr)).not.toEqual(arr);
});
test('New array contains all original elements', () => {
  expect(shuffle(arr).every(x => arr.includes(x))).toBeTruthy();
});
test('Works for empty arrays', () => {
  expect(shuffle([])).toEqual([]);
});
test('Works for single-element arrays', () => {
  expect(shuffle([1])).toEqual([1]);
});
