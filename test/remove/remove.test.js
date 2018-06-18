const expect = require('expect');
const remove = require('./remove.js');


  test('remove is a Function', () => {
  expect(remove).toBeInstanceOf(Function);
});
  t.deepEqual(remove([1, 2, 3, 4], n => n % 2 === 0), [2, 4], "Removes elements from an array for which the given function returns false");
  

