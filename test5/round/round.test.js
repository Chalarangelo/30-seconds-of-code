const expect = require('expect');
const round = require('./round.js');

test('Testing round', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof round === 'function').toBeTruthy();
  expect(round(1.005, 2)).toBe(1.01);
  expect(round(123.3423345345345345344, 11)).toBe(123.34233453453);
  expect(round(3.342, 11)).toBe(3.342);
  expect(round(1.005)).toBe(1);
  expect(isNaN(round([1.005, 2]))).toBeTruthy();
  expect(isNaN(round('string'))).toBeTruthy();
  expect(isNaN(round())).toBeTruthy();
  expect(isNaN(round(132, 413, 4134))).toBeTruthy();
  expect(isNaN(round({a: 132}, 413))).toBeTruthy();

  let start = new Date().getTime();
  round(123.3423345345345345344, 11);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
