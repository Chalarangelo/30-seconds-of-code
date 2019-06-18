const {JSONToDate} = require('./_30s.js');

test('JSONToDate is a Function', () => {
  expect(JSONToDate).toBeInstanceOf(Function);
});
test('JSONToDate returns the correct date string', () => {
  var reg = new RegExp(`Date(${Date.parse('March 14,2017')})`);
  expect(JSONToDate(reg)).toBe('14/3/2017');
});
