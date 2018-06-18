const expect = require('expect');
const takeRightWhile = require('./takeRightWhile.js');


  test('takeRightWhile is a Function', () => {
  expect(takeRightWhile).toBeInstanceOf(Function);
});
  t.deepEqual(takeRightWhile([1, 2, 3, 4], n => n < 3), [3, 4], 'Removes elements until the function returns true');
  

