const {round} = require('./_30s.js');

test('round is a Function', () => {
  expect(round).toBeInstanceOf(Function);
});
test('round(1.005, 2) returns 1.01', () => {
  expect(round(1.005, 2)).toBe(1.01);
});
test('round(123.3423345345345345344, 11) returns 123.34233453453', () => {
  expect(round(123.3423345345345345344, 11)).toBe(123.34233453453);
});
test('round(3.342, 11) returns 3.342', () => {
  expect(round(3.342, 11)).toBe(3.342);
});
test('round(1.005) returns 1', () => {
  expect(round(1.005)).toBe(1);
});
test('round([1.005, 2]) returns NaN', () => {
  expect(isNaN(round([1.005, 2]))).toBeTruthy();
});
test('round(string) returns NaN', () => {
  expect(isNaN(round('string'))).toBeTruthy();
});
test('round() returns NaN', () => {
  expect(isNaN(round())).toBeTruthy();
});
test('round(132, 413, 4134) returns NaN', () => {
  expect(isNaN(round(132, 413, 4134))).toBeTruthy();
});
test('round({a: 132}, 413) returns NaN', () => {
  expect(isNaN(round({ a: 132 }, 413))).toBeTruthy();
});
let start = new Date().getTime();
round(123.3423345345345345344, 11);
let end = new Date().getTime();
test('round(123.3423345345345345344, 11) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
