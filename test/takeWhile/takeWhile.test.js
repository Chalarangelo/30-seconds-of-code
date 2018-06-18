const expect = require('expect');
const takeWhile = require('./takeWhile.js');


  test('takeWhile is a Function', () => {
  expect(takeWhile).toBeInstanceOf(Function);
});
  t.deepEqual(takeWhile([1, 2, 3, 4], n => n >= 3), [1, 2], 'Removes elements until the function returns true');
  

