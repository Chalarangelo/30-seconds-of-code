const expect = require('expect');
const pullAtIndex = require('./pullAtIndex.js');

test('Testing pullAtIndex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pullAtIndex === 'function').toBeTruthy();
  let myArray = ['a', 'b', 'c', 'd'];
  let pulled = pullAtIndex(myArray, [1, 3]);
  expect(myArray).toEqual([ 'a', 'c' ]);
  expect(pulled).toEqual([ 'b', 'd' ]);
});
