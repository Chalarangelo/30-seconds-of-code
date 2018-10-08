const expect = require('expect');
const show = require('./show.js');

test('show is a Function', () => {
  expect(show).toBeInstanceOf(Function);
});
