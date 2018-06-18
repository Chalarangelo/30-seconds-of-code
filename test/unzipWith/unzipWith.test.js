const expect = require('expect');
const unzipWith = require('./unzipWith.js');


  test('unzipWith is a Function', () => {
  expect(unzipWith).toBeInstanceOf(Function);
});
  t.deepEqual(unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)), [3, 30, 300], `unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)) equals [3, 30, 300]`);
  

