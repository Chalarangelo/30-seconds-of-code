const expect = require('expect');
const approximatelyEqual = require('./approximatelyEqual.js');


  test('approximatelyEqual is a Function', () => {
  expect(approximatelyEqual).toBeInstanceOf(Function);
});
  test('Works for PI / 2', () => {
  expect(approximatelyEqual(Math.PI / 2.0 , 1.5708)).toBeTruthy();
});
  test('Works for 0.1 + 0.2 === 0.3', () => {
  expect(approximatelyEqual(0.1 + 0.2, 0.3)).toBeTruthy();
});
  test('Works for exactly equal values', () => {
  expect(approximatelyEqual(0.5, 0.5)).toBeTruthy();
});
  test('Works for a custom epsilon', () => {
  expect(approximatelyEqual(0.501, 0.5, 0.1)).toBeTruthy();
});
  

