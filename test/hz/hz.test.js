const expect = require('expect');
const hz = require('./hz.js');

test('hz is a Function', () => {
  expect(hz).toBeInstanceOf(Function);
});
