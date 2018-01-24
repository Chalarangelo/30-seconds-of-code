const test = require('tape');
const getStyle = require('./getStyle.js');

test('Testing getStyle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof getStyle === 'function', 'getStyle is a Function');
  //t.deepEqual(getStyle(args..), 'Expected');
  //t.equal(getStyle(args..), 'Expected');
  //t.false(getStyle(args..), 'Expected');
  //t.throws(getStyle(args..), 'Expected');
  t.end();
});