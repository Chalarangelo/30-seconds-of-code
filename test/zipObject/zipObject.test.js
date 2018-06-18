const expect = require('expect');
const zipObject = require('./zipObject.js');


  test('zipObject is a Function', () => {
  expect(zipObject).toBeInstanceOf(Function);
});
  test('zipObject([a, b, c], [1, 2]) returns {a: 1, b: 2, c: undefined}', () => {
  expect(zipObject(['a', 'b', 'c'], [1, 2]), {a: 1, b: 2, c: undefined}).toEqual()
});
  test('zipObject([a, b], [1, 2, 3]) returns {a: 1, b: 2}', () => {
  expect(zipObject(['a', 'b'], [1, 2, 3]), {a: 1, b: 2}).toEqual()
});
  test('zipObject([a, b, c], string) returns { a: s, b: t, c: r }', () => {
  expect(zipObject(['a', 'b', 'c'], 'string'), { a: 's', b: 't', c: 'r' }).toEqual()
});
  test('zipObject([a], string) returns { a: s }', () => {
  expect(zipObject(['a'], 'string'), { a: 's' }).toEqual()
});
  t.throws(() => zipObject(), 'zipObject() throws an error');
  t.throws(() => zipObject(['string'], null), 'zipObject([string], null) throws an error');
  t.throws(() => zipObject(null, [1]), 'zipObject(null, [1]) throws an error');
  t.throws(() => zipObject('string'), 'zipObject(string) throws an error');
  t.throws(() => zipObject('test', 'string'), 'zipObject(test, string) throws an error');

  

