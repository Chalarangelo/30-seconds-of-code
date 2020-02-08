const {luhnCheck} = require('./_30s.js');

test('luhnCheck is a Function', () => {
  expect(luhnCheck).toBeInstanceOf(Function);
});
test('invalidates an incorrect identification number', () => {
  expect(luhnCheck(6011329933655298)).toBeFalsy();
});
test('validates a correct identification number', () => {
  expect(luhnCheck(6011329933655299)).toBeTruthy();
});
test('validates a correct identification number', () => {
  expect(luhnCheck(5105105105105100)).toBeTruthy();
});
test('validates a correct identification number', () => {
  expect(luhnCheck('4485275742308327')).toBeTruthy();
});
test('validates identification number', () => {
  expect(luhnCheck(123456789)).toBeFalsy();
});
