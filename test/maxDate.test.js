const expect = require('expect');
const {maxDate} = require('./_30s.js');

test('maxDate is a Function', () => {
  expect(maxDate).toBeInstanceOf(Function);
});
test('maxDate produces the maximum date', () => {
  const array = [
    new Date(2017, 4, 13),
    new Date(2018, 2, 12),
    new Date(2016, 0, 10),
    new Date(2016, 0, 9)
  ];
  expect(maxDate(array)).toEqual(new Date(2018, 2, 12));
});
