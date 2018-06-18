const expect = require('expect');
const initial = require('./initial.js');


  test('initial is a Function', () => {
  expect(initial).toBeInstanceOf(Function);
});
  t.deepEqual(initial([1, 2, 3]), [1, 2], "Returns all the elements of an array except the last one");
  
