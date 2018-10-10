const expect = require('expect');
const {sumBy} = require('./_30s.js');

test('sumBy is a Function', () => {
  expect(sumBy).toBeInstanceOf(Function);
});
