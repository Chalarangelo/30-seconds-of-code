const expect = require('expect');
const attempt = require('./attempt.js');


  test('attempt is a Function', () => {
  expect(attempt).toBeInstanceOf(Function);
});
  test('Returns a value', () => {
  expect(attempt(() => 0), 0).toBe()
});
  test('Returns an error', () => {
  expect(attempt(() => {throw new Error();}) instanceof Error).toBeTruthy();
});
  

