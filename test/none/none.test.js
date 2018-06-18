const expect = require('expect');
const none = require('./none.js');


  test('none is a Function', () => {
  expect(none).toBeInstanceOf(Function);
});
  test('Returns true for arrays with no truthy values', () => {
  expect(none([0,undefined,NaN,null,''])).toBeTruthy();
});
  test('Returns false for arrays with at least one truthy value', () => {
  expect(none([0,1])).toBeFalsy();
});
  test('Returns true with a predicate function', () => {
  expect(none([4,1,0,3], x => x < 0)).toBeTruthy();
});
  test('Returns false with predicate function', () => {
  expect(none([0,1,2], x => x === 1)).toBeFalsy();
});
  

