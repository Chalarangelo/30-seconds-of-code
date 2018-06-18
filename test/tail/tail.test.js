const expect = require('expect');
const tail = require('./tail.js');

test('tail is a Function', () => {
  expect(tail).toBeInstanceOf(Function);
});
test('Returns tail', () => {
  expect(tail([1, 2, 3])).toEqual([2, 3]);
});
test('Returns tail', () => {
  expect(tail([1])).toEqual([1]);
});
