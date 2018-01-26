const test = require('tape');
const dropRightWhile = require('./dropRightWhile.js');

test('Testing dropRightWhile', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof dropRightWhile === 'function', 'dropRightWhile is a Function');
  //t.deepEqual(dropRightWhile(args..), 'Expected');
  //t.equal(dropRightWhile(args..), 'Expected');
  //t.false(dropRightWhile(args..), 'Expected');
  //t.throws(dropRightWhile(args..), 'Expected');
  t.end();
});