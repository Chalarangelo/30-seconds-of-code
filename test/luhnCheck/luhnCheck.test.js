const expect = require('expect');
const luhnCheck = require('./luhnCheck.js');


  test('luhnCheck is a Function', () => {
  expect(luhnCheck).toBeInstanceOf(Function);
});
  test('validates identification number', () => {
  expect(luhnCheck(6011329933655299)).toBe(false)
});
  test('validates identification number', () => {
  expect(luhnCheck('4485275742308327')).toBe(true)
});
  test('validates identification number', () => {
  expect(luhnCheck(123456789)).toBe(false)
});
  
