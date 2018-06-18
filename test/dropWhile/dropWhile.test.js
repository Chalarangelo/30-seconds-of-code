const expect = require('expect');
const dropWhile = require('./dropWhile.js');


  test('dropWhile is a Function', () => {
  expect(dropWhile).toBeInstanceOf(Function);
});
  t.deepEqual(dropWhile([1, 2, 3, 4], n => n >= 3), [3,4], 'Removes elements in an array until the passed function returns true.');
  

