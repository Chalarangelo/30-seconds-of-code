const expect = require('expect');
const {size} = require('./_30s.js');

test('size is a Function', () => {
  expect(size).toBeInstanceOf(Function);
});
test('Get size of arrays, objects or strings.', () => {
  expect(size([1, 2, 3, 4, 5])).toBe(5);
});
test('Get size of arrays, objects or strings.', () => {
  expect(size({ one: 1, two: 2, three: 3 })).toBe(3);
});
