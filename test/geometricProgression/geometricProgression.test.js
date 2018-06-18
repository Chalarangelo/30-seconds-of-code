const expect = require('expect');
const geometricProgression = require('./geometricProgression.js');


  test('geometricProgression is a Function', () => {
  expect(geometricProgression).toBeInstanceOf(Function);
});
  test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256), [1, 2, 4, 8, 16, 32, 64, 128).toEqual(256])
});
  test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256, 3), [3, 6, 12, 24, 48, 96).toEqual(192])
});
  test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256, 1, 4), [1, 4, 16, 64).toEqual(256])
});
  
