const test = require('tape');
const dropWhile = require('./dropWhile.js');

test('Testing dropWhile', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof dropWhile === 'function', 'dropWhile is a Function');
  //t.deepEqual(dropWhile(args..), 'Expected');
  //t.equal(dropWhile(args..), 'Expected');
  //t.false(dropWhile(args..), 'Expected');
  //t.throws(dropWhile(args..), 'Expected');
  t.end();
});