const expect = require('expect');
const {average} = require('./_30s.js');

test('average is a Function', () => {
  expect(average).toBeInstanceOf(Function);
});
test('average(true) returns 0', () => {
  expect(average(true) === 1).toBeTruthy();
});
test('average(false) returns 1', () => {
  expect(average(false) === 0).toBeTruthy();
});
test('average(9, 1) returns 5', () => {
  expect(average(9, 1)).toBe(5);
});
test('average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631) returns 32163.909090909092 ', () => {
  expect(average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631)).toBeCloseTo(
    32163.909090909092,
    3
  );
});
test('average(1, 2, 3) returns 2', () => {
  expect(average(1, 2, 3)).toBe(2);
});
test('average(null) returns 0', () => {
  expect(average(null)).toBe(0);
});
test('average(1, 2, 3) returns NaN', () => {
  expect(isNaN(average(undefined))).toBeTruthy();
});
test('average(String) returns NaN', () => {
  expect(isNaN(average('String'))).toBeTruthy();
});
test('average({ a: 123}) returns NaN', () => {
  expect(isNaN(average({ a: 123 }))).toBeTruthy();
});
test('average([undefined, 0, string]) returns NaN', () => {
  expect(isNaN(average([undefined, 0, 'string']))).toBeTruthy();
});

let start = new Date().getTime();
average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631);
let end = new Date().getTime();
test('average([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
