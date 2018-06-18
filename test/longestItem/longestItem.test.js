const expect = require('expect');
const longestItem = require('./longestItem.js');

test('longestItem is a Function', () => {
  expect(longestItem).toBeInstanceOf(Function);
});
test('Returns the longest object', () => {
  expect(longestItem('this', 'is', 'a', 'testcase')).toEqual('testcase');
});
