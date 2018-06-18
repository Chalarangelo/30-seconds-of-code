const expect = require('expect');
const head = require('./head.js');


  test('head is a Function', () => {
  expect(head).toBeInstanceOf(Function);
});
  test('head({ a: 1234}) returns undefined', () => {
  expect(head({ a: 1234}) === undefined).toBeTruthy();
});
  test('head([1, 2, 3]) returns 1', () => {
  expect(head([1, 2, 3])).toBe(1)
});
  test('head({ 0: false}) returns false', () => {
  expect(head({ 0: false}), false).toBe()
});
  test('head(String) returns S', () => {
  expect(head('String'), 'S').toBe()
});
  t.throws(() => head(null), 'head(null) throws an Error');
  t.throws(() => head(undefined), 'head(undefined) throws an Error');
  t.throws(() => head(), 'head() throws an Error');

  let start = new Date().getTime();
  head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
  let end = new Date().getTime();
  test('head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  
