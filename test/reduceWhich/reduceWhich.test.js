const expect = require('expect');
const reduceWhich = require('./reduceWhich.js');


  test('reduceWhich is a Function', () => {
  expect(reduceWhich).toBeInstanceOf(Function);
});
  t.equal(reduceWhich([1, 3, 2]), 1, 'Returns the minimum of an array');
  t.equal(reduceWhich([1, 3, 2], (a, b) => b - a), 3, 'Returns the maximum of an array');
  t.deepEqual(reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
), {name: "Lucy", age: 9}, 'Returns the object with the minimum specified value in an array');
  

