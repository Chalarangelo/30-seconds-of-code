const expect = require('expect');
const luhnCheck = require('./luhnCheck.js');

test('Testing luhnCheck', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof luhnCheck === 'function').toBeTruthy();
  expect(luhnCheck(6011329933655299)).toBe(false);
  expect(luhnCheck('4485275742308327')).toBe(true);
  expect(luhnCheck(123456789)).toBe(false);
});