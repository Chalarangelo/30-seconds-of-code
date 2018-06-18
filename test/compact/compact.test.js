const expect = require('expect');
const compact = require('./compact.js');


  test('compact is a Function', () => {
  expect(compact).toBeInstanceOf(Function);
});
  t.deepEqual(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]), [ 1, 2, 3, 'a', 's', 34 ], "Removes falsey values from an array");
  
