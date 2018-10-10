const expect = require('expect');
const {isArmstrongNumber} = require('./_30s.js');

test('isArmstrongNumber is a Function', () => {
  expect(isArmstrongNumber).toBeInstanceOf(Function);
});
