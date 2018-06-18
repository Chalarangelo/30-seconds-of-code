const expect = require('expect');
const unionWith = require('./unionWith.js');


  test('unionWith is a Function', () => {
  expect(unionWith).toBeInstanceOf(Function);
});
  t.deepEqual(unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)), [1, 1.2, 1.5, 3, 0, 3.9], 'Produces the appropriate results');
  

