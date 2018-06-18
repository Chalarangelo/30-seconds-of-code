const expect = require('expect');
const dropRightWhile = require('./dropRightWhile.js');


  test('dropRightWhile is a Function', () => {
  expect(dropRightWhile).toBeInstanceOf(Function);
});
  t.deepEqual(dropRightWhile([1, 2, 3, 4], n => n < 3), [1, 2], 'Removes elements from the end of an array until the passed function returns true.');
  

