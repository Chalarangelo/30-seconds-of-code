const expect = require('expect');
const objectFromPairs = require('./objectFromPairs.js');


  test('objectFromPairs is a Function', () => {
  expect(objectFromPairs).toBeInstanceOf(Function);
});
  t.deepEqual(objectFromPairs([['a', 1], ['b', 2]]), {a: 1, b: 2}, "Creates an object from the given key-value pairs.");
  
