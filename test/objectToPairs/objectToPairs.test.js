const test = require('tape');
const objectToPairs = require('./objectToPairs.js');

test('Testing objectToPairs', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof objectToPairs === 'function', 'objectToPairs is a Function');
  t.deepEqual(objectToPairs({ a: 1, b: 2 }), [['a',1],['b',2]], "Creates an array of key-value pair arrays from an object.");
  //t.deepEqual(objectToPairs(args..), 'Expected');
  //t.equal(objectToPairs(args..), 'Expected');
  //t.false(objectToPairs(args..), 'Expected');
  //t.throws(objectToPairs(args..), 'Expected');
  t.end();
});