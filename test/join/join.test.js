const expect = require('expect');
const join = require('./join.js');


  test('join is a Function', () => {
  expect(join).toBeInstanceOf(Function);
});
  t.deepEqual(join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'), "pen,pineapple,apple&pen", "Joins all elements of an array into a string and returns this string");
  t.deepEqual(join(['pen', 'pineapple', 'apple', 'pen'], ','), "pen,pineapple,apple,pen", "Joins all elements of an array into a string and returns this string");
  t.deepEqual(join(['pen', 'pineapple', 'apple', 'pen']), "pen,pineapple,apple,pen", "Joins all elements of an array into a string and returns this string");
  
