const test = require('tape');
const setStyle = require('./setStyle.js');

test('Testing setStyle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof setStyle === 'function', 'setStyle is a Function');
  //t.deepEqual(setStyle(args..), 'Expected');
  //t.equal(setStyle(args..), 'Expected');
  //t.false(setStyle(args..), 'Expected');
  //t.throws(setStyle(args..), 'Expected');
  t.end();
});