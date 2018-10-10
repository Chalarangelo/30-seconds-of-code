const expect = require('expect');
const {getStyle} = require('./_30s.js');

test('getStyle is a Function', () => {
  expect(getStyle).toBeInstanceOf(Function);
});
