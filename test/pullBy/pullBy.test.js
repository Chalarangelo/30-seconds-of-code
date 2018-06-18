const expect = require('expect');
const pullBy = require('./pullBy.js');


  test('pullBy is a Function', () => {
  expect(pullBy).toBeInstanceOf(Function);
});
  var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
  pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x);
  t.deepEqual(myArray, [{ x: 2 }], 'Pulls the specified values');
  

