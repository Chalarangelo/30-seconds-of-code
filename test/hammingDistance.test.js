const expect = require('expect');
const {hammingDistance} = require('./_30s.js');

test('hammingDistance is a Function', () => {
  expect(hammingDistance).toBeInstanceOf(Function);
});
test('retuns hamming disance between 2 values', () => {
  expect(hammingDistance(2, 3)).toBe(1);
});
