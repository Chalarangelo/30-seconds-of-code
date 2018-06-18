const expect = require('expect');
const sortedLastIndex = require('./sortedLastIndex.js');


  test('sortedLastIndex is a Function', () => {
  expect(sortedLastIndex).toBeInstanceOf(Function);
});
  t.equal(sortedLastIndex([10, 20, 30, 30, 40], 30), 4, 'Returns the highest index to insert the element without messing up the list order');
  

