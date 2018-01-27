const test = require('tape');
const yesNo = require('./yesNo.js');

test('Testing yesNo', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof yesNo === 'function', 'yesNo is a Function');
  t.true(yesNo('Y'), 'yesNo(Y) returns true');
  t.true(yesNo('yes'), 'yesNo(yes) returns true');
  t.true(yesNo('foo', true), 'yesNo(foo, true) returns true');
  t.false(yesNo('No'), 'yesNo(No) returns false');
  t.false(yesNo(), 'yesNo() returns false');
  t.false(yesNo(null), 'yesNo(null) returns false');
  t.false(yesNo(undefined), 'yesNo(undefined) returns false');
  t.false(yesNo([123, null]), 'yesNo([123, null]) returns false');
  t.false(yesNo(['Yes', 'No']), 'yesNo([Yes, No]) returns false');
  t.false(yesNo({ 2: 'Yes' }), 'yesNo({ 2: Yes }) returns false');
  t.true(yesNo(['Yes', 'No'], true), 'yesNo([Yes, No], true) returns true');
  t.true(yesNo({ 2: 'Yes' }, true), 'yesNo({ 2: Yes }, true) returns true');

  t.end();
});
