const expect = require('expect');
const {zipWith} = require('./_30s.js');

test('zipWith is a Function', () => {
  expect(zipWith).toBeInstanceOf(Function);
});
