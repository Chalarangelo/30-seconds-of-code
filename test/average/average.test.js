const expect = require('expect');
const average = require('./average.js');

test('Testing average', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof average === 'function').toBeTruthy();
  expect(average(true) === 1).toBeTruthy();
  expect(average(false) === 0).toBeTruthy();
  expect(average(9, 1)).toBe(5);
  expect(average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631)).toBe(32163.909090909092);
  expect(average(1, 2, 3)).toBe(2);
  expect(average(null)).toBe(0);
  expect(isNaN(average(undefined))).toBeTruthy();
  expect(isNaN(average('String'))).toBeTruthy();
  expect(isNaN(average({ a: 123}))).toBeTruthy();
  expect(isNaN(average([undefined, 0, 'string']))).toBeTruthy();

  let start = new Date().getTime();
  average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});