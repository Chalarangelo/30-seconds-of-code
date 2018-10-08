const expect = require('expect');
const setStyle = require('./setStyle.js');

test('setStyle is a Function', () => {
  expect(setStyle).toBeInstanceOf(Function);
});
