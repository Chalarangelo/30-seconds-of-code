const expect = require('expect');
const dayOfYear = require('./dayOfYear.js');

test('dayOfYear is a Function', () => {
  expect(dayOfYear).toBeInstanceOf(Function);
});
