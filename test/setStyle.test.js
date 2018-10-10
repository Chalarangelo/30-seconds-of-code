const expect = require('expect');
const {setStyle} = require('./_30s.js');

test('setStyle is a Function', () => {
  expect(setStyle).toBeInstanceOf(Function);
});
