const expect = require('expect');
const getStyle = require('./getStyle.js');

test('getStyle is a Function', () => {
  expect(getStyle).toBeInstanceOf(Function);
});
