const expect = require('expect');
const longestItem = require('./longestItem.js');


  test('longestItem is a Function', () => {
  expect(longestItem).toBeInstanceOf(Function);
});
  t.deepEqual(longestItem('this', 'is', 'a', 'testcase'), 'testcase', "Returns the longest object");
  
