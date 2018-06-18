const expect = require('expect');
const inRange = require('./inRange.js');


  test('inRange is a Function', () => {
  expect(inRange).toBeInstanceOf(Function);
});
  t.equal(inRange(3, 2, 5), true, "The given number falls within the given range");
  t.equal(inRange(3, 4), true, "The given number falls within the given range");
  t.equal(inRange(2, 3, 5), false, "The given number does not falls within the given range");
  t.equal(inRange(3, 2), false, "The given number does not falls within the given range");
  
