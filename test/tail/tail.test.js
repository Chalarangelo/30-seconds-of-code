const expect = require('expect');
const tail = require('./tail.js');


  test('tail is a Function', () => {
  expect(tail).toBeInstanceOf(Function);
});
  t.deepEqual(tail([1, 2, 3]), [2, 3], "Returns tail");
  t.deepEqual(tail([1]), [1], "Returns tail");
  
