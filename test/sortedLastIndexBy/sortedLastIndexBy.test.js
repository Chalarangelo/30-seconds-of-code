const expect = require('expect');
const sortedLastIndexBy = require('./sortedLastIndexBy.js');


  test('sortedLastIndexBy is a Function', () => {
  expect(sortedLastIndexBy).toBeInstanceOf(Function);
});
  t.equal(sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x), 1, 'Returns the highest index to insert the element without messing up the list order');
  

