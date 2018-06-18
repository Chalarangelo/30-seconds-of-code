const expect = require('expect');
const runAsync = require('./runAsync.js');

test('runAsync is a Function', () => {
  expect(runAsync).toBeInstanceOf(Function);
});
