const expect = require('expect');
const shuffle = require('./shuffle.js');


  test('shuffle is a Function', () => {
  expect(shuffle).toBeInstanceOf(Function);
});
  const arr = [1,2,3,4,5,6];
  t.notEqual(shuffle(arr), arr, 'Shuffles the array');
  test('New array contains all original elements', () => {
  expect(shuffle(arr).every(x => arr.includes(x))).toBeTruthy();
});
  t.deepEqual(shuffle([]),[],'Works for empty arrays');
  t.deepEqual(shuffle([1]),[1],'Works for single-element arrays');
  

