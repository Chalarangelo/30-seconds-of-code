const expect = require('expect');
const unzip = require('./unzip.js');


  test('unzip is a Function', () => {
  expect(unzip).toBeInstanceOf(Function);
});
  t.deepEqual(unzip([['a', 1, true], ['b', 2, false]]), [['a', 'b'], [1, 2], [true, false]], `unzip([['a', 1, true], ['b', 2, false]]) equals [['a', 'b'], [1, 2], [true, false]]`);
  t.deepEqual(unzip([['a', 1, true], ['b', 2]]), [['a', 'b'], [1, 2], [true]], `unzip([['a', 1, true], ['b', 2]]) equals [['a', 'b'], [1, 2], [true]]`);
  

