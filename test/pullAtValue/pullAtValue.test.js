const expect = require('expect');
const pullAtValue = require('./pullAtValue.js');


  test('pullAtValue is a Function', () => {
  expect(pullAtValue).toBeInstanceOf(Function);
});
  let myArray = ['a', 'b', 'c', 'd'];
  let pulled = pullAtValue(myArray, ['b', 'd']);
  test('Pulls the specified values', () => {
  expect(myArray, [ 'a', 'c' ]).toEqual()
});
  test('Pulls the specified values', () => {
  expect(pulled, [ 'b', 'd' ]).toEqual()
});
  

