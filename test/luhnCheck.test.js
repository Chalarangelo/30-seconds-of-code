const {luhnCheck} = require('./_30s.js');

test('luhnCheck is a Function', () => {
  expect(luhnCheck).toBeInstanceOf(Function);
});
test('validates identification number', () => {
  expect(luhnCheck(6011329933655299)).toBeFalsy();
});
test('validates identification number', () => {
  expect(luhnCheck('4485275742308327')).toBeTruthy();
});
test('validates identification number', () => {
  expect(luhnCheck(123456789)).toBeFalsy();
});
