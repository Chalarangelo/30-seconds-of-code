const expect = require('expect');
const zipObject = require('./zipObject.js');

test('zipObject is a Function', () => {
  expect(zipObject).toBeInstanceOf(Function);
});
test('zipObject([a, b, c], [1, 2]) returns {a: 1, b: 2, c: undefined}', () => {
  expect(zipObject(['a', 'b', 'c'], [1, 2])).toEqual({a: 1, b: 2, c: undefined});
});
test('zipObject([a, b], [1, 2, 3]) returns {a: 1, b: 2}', () => {
  expect(zipObject(['a', 'b'], [1, 2, 3])).toEqual({a: 1, b: 2});
});
test('zipObject([a, b, c], string) returns { a: s, b: t, c: r }', () => {
  expect(zipObject(['a', 'b', 'c'], 'string')).toEqual({ a: 's', b: 't', c: 'r' });
});
test('zipObject([a], string) returns { a: s }', () => {
  expect(zipObject(['a'], 'string')).toEqual({ a: 's' });
});
test('zipObject() throws an error', () => {
  expect(() => {zipObject();}).toThrow();
});
test('zipObject(([\'string\'], null) throws an error', () => {
  expect(() => {zipObject(['string'], null);}).toThrow();
});
test('zipObject(null, [1]) throws an error', () => {
  expect(() => {zipObject(null, [1]);}).toThrow();
});
test('zipObject(\'string\') throws an error', () => {
  expect(() => {zipObject('string');}).toThrow();
});
test('zipObject(\'test\', \'string\') throws an error', () => {
  expect(() => {zipObject('test', 'string');}).toThrow();
});
