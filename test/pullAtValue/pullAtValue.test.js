const expect = require('expect');
const pullAtValue = require('./pullAtValue.js');


  test('pullAtValue is a Function', () => {
  expect(pullAtValue).toBeInstanceOf(Function);
});
  let myArray = ['a', 'b', 'c', 'd'];
  let pulled = pullAtValue(myArray, ['b', 'd']);
  t.deepEqual(myArray, [ 'a', 'c' ], 'Pulls the specified values');
  t.deepEqual(pulled, [ 'b', 'd' ], 'Pulls the specified values');
  

