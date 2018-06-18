const expect = require('expect');
const zipWith = require('./zipWith.js');

test('zipWith is a Function', () => {
  expect(zipWith).toBeInstanceOf(Function);
});
