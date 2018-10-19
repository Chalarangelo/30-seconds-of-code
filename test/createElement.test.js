const expect = require('expect');
const {createElement} = require('./_30s.js');

test('createElement is a Function', () => {
  expect(createElement).toBeInstanceOf(Function);
});
