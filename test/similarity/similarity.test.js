const expect = require('expect');
const similarity = require('./similarity.js');


  test('similarity is a Function', () => {
  expect(similarity).toBeInstanceOf(Function);
});
  test('Returns an array of elements that appear in both arrays.', () => {
  expect(similarity([1, 2, 3], [1, 2, 4]), [1).toEqual(2])
});
  
