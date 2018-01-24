const test = require('tape');
const average = require('./average.js');

test('Testing average', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof average === 'function', 'average is a Function');
  t.true(average(true) === 1, 'average(true) returns 0');
  t.true(average(false) === 0, 'average(false) returns 1');
  t.equal(average(9, 1), 5, 'average(9, 1) returns 5');
  t.equal(average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631), 32163.909090909092, 'average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631) returns 32163.909090909092 ');
  t.equal(average(1, 2, 3), 2, 'average(1, 2, 3) returns 2');
  t.equal(average(null), 0, 'average(null) returns 0');
  t.true(isNaN(average(undefined)), 'average(1, 2, 3) returns NaN');
  t.true(isNaN(average('String')), 'average(String) returns NaN');
  t.true(isNaN(average({ a: 123})), 'average({ a: 123}) returns NaN');
  t.true(isNaN(average([undefined, 0, 'string'])), 'average([undefined, 0, string]) returns NaN');

  let start = new Date().getTime();
  average(153, 44, 55, 64, 71, 1122, 322774, 2232, 23423, 234, 3631);
  let end = new Date().getTime();  
  t.true((end - start) < 2000, 'head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run');
  t.end();
});