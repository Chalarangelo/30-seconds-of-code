const expect = require('expect');
const hide = require('./hide.js');

test('hide is a Function', () => {
  expect(hide).toBeInstanceOf(Function);
});
