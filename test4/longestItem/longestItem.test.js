const expect = require('expect');
const longestItem = require('./longestItem.js');

test('Testing longestItem', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof longestItem === 'function').toBeTruthy();
  expect(longestItem('this', 'is', 'a', 'testcase')).toEqual('testcase');
});