const expect = require('expect');
const deepFlatten = require('./deepFlatten.js');


  test('deepFlatten is a Function', () => {
  expect(deepFlatten).toBeInstanceOf(Function);
});
  t.deepEqual(deepFlatten([1, [2], [[3], 4], 5]), [1, 2, 3, 4, 5], "Deep flattens an array");
  
