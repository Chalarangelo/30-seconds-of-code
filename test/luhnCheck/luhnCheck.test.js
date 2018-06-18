const expect = require('expect');
const luhnCheck = require('./luhnCheck.js');


  test('luhnCheck is a Function', () => {
  expect(luhnCheck).toBeInstanceOf(Function);
});
  t.equal(luhnCheck(6011329933655299), false, "validates identification number");
  t.equal(luhnCheck('4485275742308327'), true, "validates identification number");
  t.equal(luhnCheck(123456789), false, "validates identification number");
  
