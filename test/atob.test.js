const expect = require('expect');
const {atob} = require('./_30s.js');

test('atob is a Function', () => {
  expect(atob).toBeInstanceOf(Function);
});
test('atob("Zm9vYmFy") equals "foobar"', () => {
  expect(atob('Zm9vYmFy')).toBe('foobar');
});
test('atob("Z") returns ""', () => {
  expect(atob('Z')).toBe('');
});
