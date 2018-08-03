const expect = require('expect');
const reduceWhich = require('./reduceWhich.js');

test('reduceWhich is a Function', () => {
  expect(reduceWhich).toBeInstanceOf(Function);
});
test('Returns the minimum of an array', () => {
  expect(reduceWhich([1, 3, 2])).toBe(1);
});
test('Returns the maximum of an array', () => {
  expect(reduceWhich([1, 3, 2], (a, b) => b - a)).toBe(3);
});
test('Returns the object with the minimum specified value in an array', () => {
  expect(
    reduceWhich(
      [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
      (a, b) => a.age - b.age
    )
  ).toEqual({ name: 'Lucy', age: 9 });
});
