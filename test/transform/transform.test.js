const test = require('tape');
const transform = require('./transform.js');

test('Testing transform', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof transform === 'function', 'transform is a Function');
  //t.deepEqual(transform(args..), 'Expected');
  //t.equal(transform(args..), 'Expected');
  //t.false(transform(args..), 'Expected');
  //t.throws(transform(args..), 'Expected');
  t.end();
});