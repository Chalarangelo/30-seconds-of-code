const expect = require('expect');
const zip = require('./zip.js');


  test('zip is a Function', () => {
  expect(zip).toBeInstanceOf(Function);
});
  test('zip([a, b], [1, 2], [true, false]) returns [[a, 1, true], [b, 2, false]]', () => {
  expect(zip(['a', 'b'], [1, 2], [true, false]), [['a', 1, true], ['b', 2, false]]).toEqual()
});
  test('zip([a], [1, 2], [true, false]) returns [[a, 1, true], [undefined, 2, false]]', () => {
  expect(zip(['a'], [1, 2], [true, false]), [['a', 1, true], [undefined, 2, false]]).toEqual()
});
  test('zip([]) returns []', () => {
  expect(zip(), []).toEqual()
});
  test('zip(123) returns []', () => {
  expect(zip(123), []).toEqual()
});
  test('zip([a, b], [1, 2], [true, false]) returns an Array', () => {
  expect(Array.isArray(zip(['a', 'b'], [1, 2], [true, false]))).toBeTruthy();
});
  test('zip([a], [1, 2], [true, false]) returns an Array', () => {
  expect(Array.isArray(zip(['a'], [1, 2], [true, false]))).toBeTruthy();
});
  t.throws(() => zip(null), 'zip(null) throws an error');
  t.throws(() => zip(undefined), 'zip(undefined) throws an error');

  

