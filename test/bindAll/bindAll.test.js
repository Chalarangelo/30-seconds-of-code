const test = require('tape');
const bindAll = require('./bindAll.js');

test('Testing bindAll', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bindAll === 'function', 'bindAll is a Function');
  //t.deepEqual(bindAll(args..), 'Expected');
  //t.equal(bindAll(args..), 'Expected');
  //t.false(bindAll(args..), 'Expected');
  //t.throws(bindAll(args..), 'Expected');
  t.end();
});