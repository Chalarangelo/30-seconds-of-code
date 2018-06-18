const expect = require('expect');
const similarity = require('./similarity.js');


  test('similarity is a Function', () => {
  expect(similarity).toBeInstanceOf(Function);
});
  t.deepEqual(similarity([1, 2, 3], [1, 2, 4]), [1, 2], "Returns an array of elements that appear in both arrays.");
  
