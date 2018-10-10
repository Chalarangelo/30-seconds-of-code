const expect = require('expect');
const {hz} = require('./_30s.js');

test('hz is a Function', () => {
  expect(hz).toBeInstanceOf(Function);
});
