const {chunk} = require('./_30s.js');

test('chunk is a Function', () => {
  expect(chunk).toBeInstanceOf(Function);
});
test('chunk([1, 2, 3, 4, 5], 2) returns [[1,2],[3,4],[5]] ', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});
test('chunk([]) returns []', () => {
  expect(chunk([])).toEqual([]);
});
test('chunk(123) returns []', () => {
  expect(chunk(123)).toEqual([]);
});
test('chunk({ a: 123}) returns []', () => {
  expect(chunk({ a: 123 })).toEqual([]);
});
test('chunk(string, 2) returns [ st, ri, ng ]', () => {
  expect(chunk('string', 2)).toEqual(['st', 'ri', 'ng']);
});
test('chunk() throws an error', () => {
  expect(() => {
    chunk();
  }).toThrow();
});
test('chunk(undefined) throws an error', () => {
  expect(() => {
    chunk(undefined);
  }).toThrow();
});
test('chunk(null) throws an error', () => {
  expect(() => {
    chunk(null);
  }).toThrow();
});
let start = new Date().getTime();
chunk('This is a string', 2);
let end = new Date().getTime();
test('chunk(This is a string, 2) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
