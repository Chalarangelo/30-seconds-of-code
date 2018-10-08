const expect = require('expect');
const union = require('./union.js');

test('union is a Function', () => {
  expect(union).toBeInstanceOf(Function);
});
test('union([1, 2, 3], [4, 3, 2]) returns [1, 2, 3, 4]', () => {
  expect(union([1, 2, 3], [4, 3, 2])).toEqual([1, 2, 3, 4]);
});
test("union('str', 'asd') returns [ 's', 't', 'r', 'a', 'd' ]", () => {
  expect(union('str', 'asd')).toEqual(['s', 't', 'r', 'a', 'd']);
});
test('union([[], {}], [1, 2, 3]) returns [[], {}, 1, 2, 3]', () => {
  expect(union([[], {}], [1, 2, 3])).toEqual([[], {}, 1, 2, 3]);
});
test('union([], []) returns []', () => {
  expect(union([], [])).toEqual([]);
});
test('union() throws an error', () => {
  expect(() => {
    union();
  }).toThrow();
});
test("union(true, 'str') throws an error", () => {
  expect(() => {
    union(true, 'str');
  }).toThrow();
});
test("union('false', true) throws an error", () => {
  expect(() => {
    union('false', true);
  }).toThrow();
});
test('union((123, {}) throws an error', () => {
  expect(() => {
    union(123, {});
  }).toThrow();
});
test('union([], {}) throws an error', () => {
  expect(() => {
    union([], {});
  }).toThrow();
});
test('union(undefined, null) throws an error', () => {
  expect(() => {
    union(undefined, null);
  }).toThrow();
});
let start = new Date().getTime();
union([1, 2, 3], [4, 3, 2]);
let end = new Date().getTime();
test('union([1, 2, 3], [4, 3, 2]) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
