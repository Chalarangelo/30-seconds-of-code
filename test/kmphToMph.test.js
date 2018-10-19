const expect = require('expect');
const {kmphToMph} = require('./_30s.js');

test('kmphToMph is a Function', () => {
  expect(kmphToMph).toBeInstanceOf(Function);
});
test('Returns mph from kph.', () => {
  expect(kmphToMph(10)).toBe(6.21371192);
});
