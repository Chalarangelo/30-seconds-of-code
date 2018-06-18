const expect = require('expect');
const join = require('./join.js');

test('Testing join', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof join === 'function').toBeTruthy();
  expect(join(['pen', 'pineapple', 'apple', 'pen'], ',', '&')).toEqual("pen,pineapple,apple&pen");
  expect(join(['pen', 'pineapple', 'apple', 'pen'], ',')).toEqual("pen,pineapple,apple,pen");
  expect(join(['pen', 'pineapple', 'apple', 'pen'])).toEqual("pen,pineapple,apple,pen");
});