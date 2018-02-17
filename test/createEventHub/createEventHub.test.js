const test = require('tape');
const createEventHub = require('./createEventHub.js');

test('Testing createEventHub', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof createEventHub === 'function', 'createEventHub is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(createEventHub(args..), 'Expected');
  //t.equal(createEventHub(args..), 'Expected');
  //t.false(createEventHub(args..), 'Expected');
  //t.throws(createEventHub(args..), 'Expected');
  t.end();
});
