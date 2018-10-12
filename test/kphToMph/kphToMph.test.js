const expect = require('expect');
const kphToMph = require('./kphToMph.js');

test('kphToMph is a Function', () => {
  expect(kphToMph).toBeInstanceOf(Function);
});
test('Returns mph from kph.', () => {
  expect(kphToMph(10)).toBe(6.21371192);
});
test('Returns mph from kph.', () => {
  expect(kphToMph(345.4)).toBe(214.62160971679998);
});
