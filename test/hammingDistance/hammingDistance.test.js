const expect = require('expect');
const hammingDistance = require('./hammingDistance.js');


  test('hammingDistance is a Function', () => {
  expect(hammingDistance).toBeInstanceOf(Function);
});
  t.equal(hammingDistance(2, 3), 1, "retuns hamming disance between 2 values");
  
