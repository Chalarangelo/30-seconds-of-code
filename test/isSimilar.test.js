const expect = require('expect');
const {isSimilar} = require('./_30s.js');

test('isSimilar is a Function', () => {
  expect(isSimilar).toBeInstanceOf(Function);
});
test('isSimilar returns true', () => {
  expect(isSimilar('rt', 'Rohit')).toBeTruthy();
});
test('isSimilar returns false', () => {
  expect(isSimilar('tr', 'Rohit')).toBeFalsy();
});
