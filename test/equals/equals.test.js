const expect = require('expect');
const equals = require('./equals.js');

test('equals is a Function', () => {
  expect(equals).toBeInstanceOf(Function);
});
test('{ a: [2, {e: 3}], b: [4], c: 'foo' } is equal to { a: [2, {e: 3}], b: [4], c: 'foo' }', () => {
  expect(equals({ a: [2, {e: 3}], b: [4], c: 'foo' }, { a: [2, {e: 3}], b: [4], c: 'foo' })).toBeTruthy();
});
test('[1,2,3] is equal to [1,2,3]', () => {
  expect(equals([1, 2, 3], [1, 2, 3])).toBeTruthy();
});
test('{ a: [2, 3], b: [4] } is not equal to { a: [2, 3], b: [6] }', () => {
  expect(equals({ a: [2, 3], b: [4] }, { a: [2, 3], b: [6] })).toBeFalsy();
});
test('[1,2,3] is not equal to [1,2,4]', () => {
  expect(equals([1, 2, 3], [1, 2, 4])).toBeFalsy();
});
test('[1, 2, 3] should be equal to { 0: 1, 1: 2, 2: 3 }) - type is different, but their enumerable properties match.', () => {
  expect(equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBeTruthy();
});
