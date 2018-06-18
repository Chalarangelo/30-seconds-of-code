const expect = require('expect');
const join = require('./join.js');

test('join is a Function', () => {
  expect(join).toBeInstanceOf(Function);
});
test('Joins all elements of an array into a string and returns this string', () => {
  expect(join(['pen', 'pineapple', 'apple', 'pen'], ',', '&')).toEqual('pen,pineapple,apple&pen');
});
test('Joins all elements of an array into a string and returns this string', () => {
  expect(join(['pen', 'pineapple', 'apple', 'pen'], ',')).toEqual('pen,pineapple,apple,pen');
});
test('Joins all elements of an array into a string and returns this string', () => {
  expect(join(['pen', 'pineapple', 'apple', 'pen'])).toEqual('pen,pineapple,apple,pen');
});  
