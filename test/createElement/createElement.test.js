const expect = require('expect');
const createElement = require('./createElement.js');

test('createElement is a Function', () => {
  expect(createElement).toBeInstanceOf(Function);
});
