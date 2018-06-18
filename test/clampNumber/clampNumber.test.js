const expect = require('expect');
const clampNumber = require('./clampNumber.js');


  test('clampNumber is a Function', () => {
  expect(clampNumber).toBeInstanceOf(Function);
});
  t.equal(clampNumber(2, 3, 5), 3, "Clamps num within the inclusive range specified by the boundary values a and b");
  
