const expect = require('expect');
const reduceWhich = require('./reduceWhich.js');

test('Testing reduceWhich', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof reduceWhich === 'function').toBeTruthy();
  expect(reduceWhich([1, 3, 2])).toBe(1);
  expect(reduceWhich([1, 3, 2], (a, b) => b - a)).toBe(3);
  expect(reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
)).toEqual({name: "Lucy", age: 9});
});
