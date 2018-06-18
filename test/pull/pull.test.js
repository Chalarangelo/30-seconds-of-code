const expect = require('expect');
const pull = require('./pull.js');

test('pull is a Function', () => {
  expect(pull).toBeInstanceOf(Function);
});
let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray, 'a', 'c');
test('Pulls the specified values', () => {
  expect(myArray).toEqual(['b','b'])
});
