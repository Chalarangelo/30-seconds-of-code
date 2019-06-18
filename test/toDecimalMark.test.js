const {toDecimalMark} = require('./_30s.js');

test('toDecimalMark is a Function', () => {
  expect(toDecimalMark).toBeInstanceOf(Function);
});
test('convert a float-point arithmetic to the Decimal mark form', () => {
  expect(toDecimalMark(12305030388.9087)).toBe('12,305,030,388.909');
});
