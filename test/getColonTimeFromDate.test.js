const expect = require('expect');
const {getColonTimeFromDate} = require('./_30s.js');

test('getColonTimeFromDate is a Function', () => {
  expect(getColonTimeFromDate).toBeInstanceOf(Function);
});
test('Gets the time in the proper format.', () => {
  let date = new Date();
  expect(getColonTimeFromDate(date)).toEqual(date.toTimeString().slice(0, 8));
});
