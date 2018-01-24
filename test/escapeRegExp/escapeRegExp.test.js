const test = require('tape');
const escapeRegExp = require('./escapeRegExp.js');

test('Testing escapeRegExp', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof escapeRegExp === 'function', 'escapeRegExp is a Function');
  t.equal(escapeRegExp('(test)'), '\\(test\\)', "Escapes a string to use in a regular expression");
  //t.deepEqual(escapeRegExp(args..), 'Expected');
  //t.equal(escapeRegExp(args..), 'Expected');
  //t.false(escapeRegExp(args..), 'Expected');
  //t.throws(escapeRegExp(args..), 'Expected');
  t.end();
});