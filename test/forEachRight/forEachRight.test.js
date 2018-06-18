const expect = require('expect');
const forEachRight = require('./forEachRight.js');


  test('forEachRight is a Function', () => {
  expect(forEachRight).toBeInstanceOf(Function);
});
  let output = '';
  forEachRight([1, 2, 3, 4], val => output+=val);
  t.equal(output, '4321', 'Iterates over the array in reverse');
  

