const expect = require('expect');
const unionBy = require('./unionBy.js');


  test('unionBy is a Function', () => {
  expect(unionBy).toBeInstanceOf(Function);
});
  t.deepEqual(unionBy([2.1], [1.2, 2.3], Math.floor), [2.1, 1.2], 'Produces the appropriate results');
  

