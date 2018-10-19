const expect = require('expect');
const {dayOfYear} = require('./_30s.js');

test('dayOfYear is a Function', () => {
  expect(dayOfYear).toBeInstanceOf(Function);
});
