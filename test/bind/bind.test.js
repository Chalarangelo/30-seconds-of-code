const test = require('tape');
const bind = require('./bind.js');

test('Testing bind', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bind === 'function', 'bind is a Function');
  //t.deepEqual(bind(args..), 'Expected');
  //t.equal(bind(args..), 'Expected');
  //t.false(bind(args..), 'Expected');
  //t.throws(bind(args..), 'Expected');
  t.end();
});