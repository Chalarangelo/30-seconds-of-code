const expect = require('expect');
const on = require('./on.js');

test('on is a Function', () => {
  expect(on).toBeInstanceOf(Function);
});
