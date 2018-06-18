const expect = require('expect');
const last = require('./last.js');


  test('last is a Function', () => {
  expect(last).toBeInstanceOf(Function);
});
  test('last({ a: 1234}) returns undefined', () => {
  expect(last({ a: 1234}) === undefined).toBeTruthy();
});
  t.equal(last([1, 2, 3]), 3, "last([1, 2, 3]) returns 3");
  test('last({ 0: false}) returns undefined', () => {
  expect(last({ 0: false}), undefined).toBe()
});
  test('last(String) returns g', () => {
  expect(last('String'), 'g').toBe()
});
  t.throws(() => last(null), 'last(null) throws an Error');
  t.throws(() => last(undefined), 'last(undefined) throws an Error');
  t.throws(() => last(), 'last() throws an Error');

  let start = new Date().getTime();
  last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
  let end = new Date().getTime();
  test('last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  
