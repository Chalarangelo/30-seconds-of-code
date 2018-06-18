const expect = require('expect');
const geometricProgression = require('./geometricProgression.js');

test('Testing geometricProgression', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof geometricProgression === 'function').toBeTruthy();
  expect(geometricProgression(256)).toEqual([1, 2, 4, 8, 16, 32, 64, 128, 256]);
  expect(geometricProgression(256, 3)).toEqual([3, 6, 12, 24, 48, 96, 192]);
  expect(geometricProgression(256, 1, 4)).toEqual([1, 4, 16, 64, 256]);
});