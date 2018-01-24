const test = require('tape');
const validateNumber = require('./validateNumber.js');

test('Testing validateNumber', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof validateNumber === 'function', 'validateNumber is a Function');
  t.true(validateNumber(9), 'validateNumber(9) returns true');
  t.true(validateNumber('234asd'.slice(0, 2)), 'validateNumber(234asd.slice(0, 2)) returns true');
  t.true(validateNumber(1232), 'validateNumber(1232) returns true');
  t.true(validateNumber(1232 + 13423), 'validateNumber(1232 + 13423) returns true');
  t.true(validateNumber(1232 * 2342 * 123), 'validateNumber(1232 * 2342 * 123) returns true');
  t.true(validateNumber(1232.23423536), 'validateNumber(1232.23423536) returns true');
  t.false(validateNumber('234asd'), 'validateNumber(234asd) returns false');
  t.false(validateNumber('e234d'), 'validateNumber(e234d) returns false');
  t.false(validateNumber(false), 'validateNumber(false) returns false');
  t.false(validateNumber(true), 'validateNumber(true) returns false');
  t.false(validateNumber(null), 'validateNumber(null) returns false');
  t.false(validateNumber(123 * 'asd'), 'validateNumber(123 * asd) returns false');

  t.end();
});
