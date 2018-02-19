const test = require('tape');
const timeTaken = require('./timeTaken.js');

test('Testing timeTaken', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof timeTaken === 'function', 'timeTaken is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(timeTaken(args..), 'Expected');
  //t.equal(timeTaken(args..), 'Expected');
  //t.false(timeTaken(args..), 'Expected');
  //t.throws(timeTaken(args..), 'Expected');
  t.end();
});
