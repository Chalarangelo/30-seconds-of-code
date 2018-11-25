const expect = require('expect');
const {geometricProgression} = require('./_30s.js');

test('geometricProgression is a Function', () => {
  expect(geometricProgression).toBeInstanceOf(Function);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256)).toEqual([1, 2, 4, 8, 16, 32, 64, 128, 256]);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256, 3)).toEqual([3, 6, 12, 24, 48, 96, 192]);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(geometricProgression(256, 1, 4)).toEqual([1, 4, 16, 64, 256]);
});
