const test = require('tape');
const mostPerformant = require('./mostPerformant.js');

test('Testing mostPerformant', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof mostPerformant === 'function', 'mostPerformant is a Function');
  //t.deepEqual(mostPerformant(args..), 'Expected');
  //t.equal(mostPerformant(args..), 'Expected');
  //t.false(mostPerformant(args..), 'Expected');
  //t.throws(mostPerformant(args..), 'Expected');
  t.end();
});