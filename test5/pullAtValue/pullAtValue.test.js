const expect = require('expect');
const pullAtValue = require('./pullAtValue.js');

test('Testing pullAtValue', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pullAtValue === 'function').toBeTruthy();
  let myArray = ['a', 'b', 'c', 'd'];
  let pulled = pullAtValue(myArray, ['b', 'd']);
  expect(myArray).toEqual([ 'a', 'c' ]);
  expect(pulled).toEqual([ 'b', 'd' ]);
});
