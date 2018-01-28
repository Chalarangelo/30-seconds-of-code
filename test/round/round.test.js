const test = require('tape');
const round = require('./round.js');

test('Testing round', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof round === 'function', 'round is a Function');
  t.equal(round(1.005, 2), 1.01, "round(1.005, 2) returns 1.01");
  t.equal(round(123.3423345345345345344, 11), 123.34233453453, "round(123.3423345345345345344, 11) returns 123.34233453453");
  t.equal(round(3.342, 11), 3.342, "round(3.342, 11) returns 3.342");
  t.equal(round(1.005), 1, "round(1.005) returns 1");
  t.true(isNaN(round([1.005, 2])), 'round([1.005, 2]) returns NaN');
  t.true(isNaN(round('string')), 'round(string) returns NaN');
  t.true(isNaN(round()), 'round() returns NaN');
  t.true(isNaN(round(132, 413, 4134)), 'round(132, 413, 4134) returns NaN');
  t.true(isNaN(round({a: 132}, 413)), 'round({a: 132}, 413) returns NaN');

  let start = new Date().getTime();
  round(123.3423345345345345344, 11);
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'round(123.3423345345345345344, 11) takes less than 2s to run');
  t.end();
});
