const expect = require('expect');
const hammingDistance = require('./hammingDistance.js');

test('Testing hammingDistance', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hammingDistance === 'function').toBeTruthy();
  expect(hammingDistance(2, 3)).toBe(1);
});