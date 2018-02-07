const test = require('tape');
const unary = require('./unary.js');

test('Testing unary', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unary === 'function', 'unary is a Function');
  t.deepEqual(['6', '8', '10'].map(unary(parseInt)), [6, 8, 10], 'Discards arguments after the first one');
  //t.deepEqual(unary(args..), 'Expected');
  //t.equal(unary(args..), 'Expected');
  //t.false(unary(args..), 'Expected');
  //t.throws(unary(args..), 'Expected');
  t.end();
});
