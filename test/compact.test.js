const expect = require('expect');
const {compact} = require('./_30s.js');

test('compact is a Function', () => {
  expect(compact).toBeInstanceOf(Function);
});
test('Removes falsey values from an array', () => {
  expect(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])).toEqual([
    1,
    2,
    3,
    'a',
    's',
    34
  ]);
});
