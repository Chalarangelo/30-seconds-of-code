const expect = require('expect');
const pull = require('./pull.js');


  test('pull is a Function', () => {
  expect(pull).toBeInstanceOf(Function);
});
  let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
  pull(myArray, 'a', 'c');
  t.deepEqual(myArray, ['b','b'], 'Pulls the specified values');
  

