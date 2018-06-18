const expect = require('expect');
const pull = require('./pull.js');

test('Testing pull', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pull === 'function').toBeTruthy();
  let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
  pull(myArray, 'a', 'c');
  expect(myArray).toEqual(['b','b']);
});
