const expect = require('expect');
const zip = require('./zip.js');

test('zip is a Function', () => {
  expect(zip).toBeInstanceOf(Function);
});
test('zip([a, b], [1, 2], [true, false]) returns [[a, 1, true], [b, 2, false]]', () => {
  expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([['a', 1, true], ['b', 2, false]]);
});
test('zip([a], [1, 2], [true, false]) returns [[a, 1, true], [undefined, 2, false]]', () => {
  expect(zip(['a'], [1, 2], [true, false])).toEqual([['a', 1, true], [undefined, 2, false]]);
});
test('zip([]) returns []', () => {
  expect(zip()).toEqual([]);
});
test('zip(123) returns []', () => {
  expect(zip(123)).toEqual([]);
});
test('zip([a, b], [1, 2], [true, false]) returns an Array', () => {
  expect(Array.isArray(zip(['a', 'b'], [1, 2], [true, false]))).toBeTruthy();
});
test('zip([a], [1, 2], [true, false]) returns an Array', () => {
  expect(Array.isArray(zip(['a'], [1, 2], [true, false]))).toBeTruthy();
});
test('zip(null) throws an error', () => {
  expect(() => {
    zip(null);
  }).toThrow();
});
test('zip(undefined) throws an error', () => {
  expect(() => {
    zip(undefined);
  }).toThrow();
});
