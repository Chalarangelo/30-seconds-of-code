const expect = require('expect');
const castArray = require('./castArray.js');


  test('castArray is a Function', () => {
  expect(castArray).toBeInstanceOf(Function);
});
  t.deepEqual(castArray(1), [1], 'Works for single values');
  t.deepEqual(castArray([1]), [1], 'Works for arrays with one value');
  t.deepEqual(castArray([1,2,3]), [1,2,3], 'Works for arrays with multiple value');
  t.deepEqual(castArray('test'), ['test'], 'Works for strings');
  t.deepEqual(castArray({}), [{}], 'Works for objects');
  

