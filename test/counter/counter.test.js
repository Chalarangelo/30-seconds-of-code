const expect = require('expect');
const counter = require('./counter.js');

test('counter is a Function', () => {
  expect(counter).toBeInstanceOf(Function);
});
