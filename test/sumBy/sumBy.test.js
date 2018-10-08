const expect = require('expect');
const sumBy = require('./sumBy.js');

test('sumBy is a Function', () => {
  expect(sumBy).toBeInstanceOf(Function);
});
