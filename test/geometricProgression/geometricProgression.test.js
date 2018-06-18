const expect = require('expect');
const geometricProgression = require('./geometricProgression.js');


  test('geometricProgression is a Function', () => {
  expect(geometricProgression).toBeInstanceOf(Function);
});
  t.deepEqual(geometricProgression(256), [1, 2, 4, 8, 16, 32, 64, 128, 256], "Initializes an array containing the numbers in the specified range");
  t.deepEqual(geometricProgression(256, 3), [3, 6, 12, 24, 48, 96, 192], "Initializes an array containing the numbers in the specified range");
  t.deepEqual(geometricProgression(256, 1, 4), [1, 4, 16, 64, 256], "Initializes an array containing the numbers in the specified range");
  
