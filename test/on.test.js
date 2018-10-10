const expect = require('expect');
const {on} = require('./_30s.js');

test('on is a Function', () => {
  expect(on).toBeInstanceOf(Function);
});
