const test = require('tape');
const degreesToRads = require('./degreesToRads.js');

test('Testing degreesToRads', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  const approxeq = (v1,v2, diff = 0.001) => Math.abs(v1 - v2) < diff; // Use to account for rounding errors
  t.true(typeof degreesToRads === 'function', 'degreesToRads is a Function');
  t.true(approxeq(degreesToRads(90.0), Math.PI / 2), 'Returns the appropriate value');
  //t.deepEqual(degreesToRads(args..), 'Expected');
  //t.equal(degreesToRads(args..), 'Expected');
  //t.false(degreesToRads(args..), 'Expected');
  //t.throws(degreesToRads(args..), 'Expected');
  t.end();
});
