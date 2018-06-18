const expect = require('expect');
const xProd = require('./xProd.js');


  test('xProd is a Function', () => {
  expect(xProd).toBeInstanceOf(Function);
});
  t.deepEqual(xProd([1, 2], ['a', 'b']), [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']], `xProd([1, 2], ['a', 'b']) returns [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]`);
  

