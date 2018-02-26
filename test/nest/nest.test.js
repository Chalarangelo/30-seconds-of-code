const test = require('tape');
const nest = require('./nest.js');

test('Testing nest', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof nest === 'function', 'nest is a Function');
  //t.deepEqual(nest(args..), 'Expected');
  //t.equal(nest(args..), 'Expected');
  //t.false(nest(args..), 'Expected');
  //t.throws(nest(args..), 'Expected');
  t.end();
});