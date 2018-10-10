const expect = require('expect');
const {JSONToDate} = require('./_30s.js');

test('JSONToDate is a Function', () => {
  expect(JSONToDate).toBeInstanceOf(Function);
});
