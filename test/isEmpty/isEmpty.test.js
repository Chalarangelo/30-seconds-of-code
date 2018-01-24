const test = require('tape');
const isEmpty = require('./isEmpty.js');

test('Testing isEmpty', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isEmpty === 'function', 'isEmpty is a Function');
  //t.deepEqual(isEmpty(args..), 'Expected');
  //t.equal(isEmpty(args..), 'Expected');
  //t.false(isEmpty(args..), 'Expected');
  //t.throws(isEmpty(args..), 'Expected');
  t.end();
});