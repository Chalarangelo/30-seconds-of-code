const expect = require('expect');
const {btoa} = require('./_30s.js');

test('btoa is a Function', () => {
  expect(btoa).toBeInstanceOf(Function);
});
test('btoa("foobar") equals "Zm9vYmFy"', () => {
  expect(btoa('foobar')).toBe('Zm9vYmFy');
});
