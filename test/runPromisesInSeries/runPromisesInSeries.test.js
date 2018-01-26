const test = require('tape');
const runPromisesInSeries = require('./runPromisesInSeries.js');

test('Testing runPromisesInSeries', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof runPromisesInSeries === 'function', 'runPromisesInSeries is a Function');
  //t.deepEqual(runPromisesInSeries(args..), 'Expected');
  //t.equal(runPromisesInSeries(args..), 'Expected');
  //t.false(runPromisesInSeries(args..), 'Expected');
  //t.throws(runPromisesInSeries(args..), 'Expected');
  t.end();
});