const expect = require('expect');
const pullAtIndex = require('./pullAtIndex.js');


  test('pullAtIndex is a Function', () => {
  expect(pullAtIndex).toBeInstanceOf(Function);
});
  let myArray = ['a', 'b', 'c', 'd'];
  let pulled = pullAtIndex(myArray, [1, 3]);
  t.deepEqual(myArray, [ 'a', 'c' ], 'Pulls the given values');
  t.deepEqual(pulled, [ 'b', 'd' ], 'Pulls the given values');
  

