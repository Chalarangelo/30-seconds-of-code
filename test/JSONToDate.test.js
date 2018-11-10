const expect = require('expect');
const {JSONToDate} = require('./_30s.js');

test('JSONToDate is a Function', () => {
  expect(JSONToDate).toBeInstanceOf(Function);
});
test('JSONToDate returns the correct date string', () => {
  expect(JSONToDate(/Date(1489525200000)/)).toBe('14/3/2017');
});
