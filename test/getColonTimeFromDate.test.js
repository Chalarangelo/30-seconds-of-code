const expect = require('expect');
const {getColonTimeFromDate} = require('./_30s.js');

test('getColonTimeFromDate is a Function', () => {
  expect(getColonTimeFromDate).toBeInstanceOf(Function);
});
