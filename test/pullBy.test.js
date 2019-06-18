const {pullBy} = require('./_30s.js');

test('pullBy is a Function', () => {
  expect(pullBy).toBeInstanceOf(Function);
});
var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x);
test('Pulls the specified values', () => {
  expect(myArray).toEqual([{ x: 2 }]);
});
