const expect = require('expect');
const {elementContains} = require('./_30s.js');

test('elementContains is a Function', () => {
  expect(elementContains).toBeInstanceOf(Function);
});
test('elementContains returns true', () => {
  let p = document.createElement('div');
  let c = p.appendChild(document.createElement('div'));
  expect(elementContains(p, c)).toBeTruthy();
});
test('elementContains returns false', () => {
  let p = document.createElement('div');
  let c = document.createElement('div');
  expect(elementContains(p, c)).toBeFalsy();
});
