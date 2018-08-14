const expect = require('expect');
const longestItem = require('./longestItem.js');

test('longestItem is a Function', () => {
  expect(longestItem).toBeInstanceOf(Function);
});
test('Returns the longest object from plain values', () => {
  expect(longestItem('this', 'is', 'a', 'testcase')).toEqual('testcase');
});
test('Returns the longest object from a spread array', () => {
  expect(longestItem(...['a', 'ab', 'abc'])).toEqual('abc');
});
test('Returns the longest object from mixed input', () => {
  expect(longestItem(...['a', 'ab', 'abc'],'abcd')).toEqual('abcd');
});
test('Returns the longest array', () => {
  expect(longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});
test('Returns the longest object when comparing arrays and strings', () => {
  expect(longestItem([1, 2, 3], 'foobar')).toEqual('foobar');
});
test('Returns undefined without any input', () => {
  expect(longestItem()).toEqual(undefined);
});
test('Returns first found of all similar', () => {
  expect(longestItem('a','b','c')).toEqual('a');
});
test('Throws TypeError if all inputs are undefined', () => {
  expect(() => {
    longestItem(undefined,undefined);
  }).toThrow(TypeError);
});
