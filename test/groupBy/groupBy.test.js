const expect = require('expect');
const groupBy = require('./groupBy.js');


  test('groupBy is a Function', () => {
  expect(groupBy).toBeInstanceOf(Function);
});
  t.deepEqual(groupBy([6.1, 4.2, 6.3], Math.floor), {4: [4.2], 6: [6.1, 6.3]}, "Groups the elements of an array based on the given function");
  t.deepEqual(groupBy(['one', 'two', 'three'], 'length'), {3: ['one', 'two'], 5: ['three']}, "Groups the elements of an array based on the given function");
  
