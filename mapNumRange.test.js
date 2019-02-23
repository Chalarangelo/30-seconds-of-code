const expect = require('expect');
const {mapNumRange} = require('./_30s.js');

test('mapNumRange is a Function', () => {
  expect(mapNumRange).toBeInstanceOf(Function);
});
test('Maps 5 to the range 0-100 from 0-10', () => {
  expect(distance(5,0,10,0,100)).toEqual(50);
});
