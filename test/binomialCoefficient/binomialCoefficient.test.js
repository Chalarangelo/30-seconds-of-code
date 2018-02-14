const test = require('tape');
const binomialCoefficient = require('./binomialCoefficient.js');

test('Testing binomialCoefficient', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof binomialCoefficient === 'function', 'binomialCoefficient is a Function');
  t.equal(binomialCoefficient(8, 2), 28, 'Returns the appropriate value');
  t.equal(binomialCoefficient(0, 0), 1, 'Returns the appropriate value');
  t.equal(binomialCoefficient(5, 3), 10, 'Returns the appropriate value');
  t.true(Number.isNaN(binomialCoefficient(NaN, 3)), 'Returns NaN');
  t.true(Number.isNaN(binomialCoefficient(5, NaN)), 'Returns NaN');
  //t.deepEqual(binomialCoefficient(args..), 'Expected');
  //t.equal(binomialCoefficient(args..), 'Expected');
  //t.false(binomialCoefficient(args..), 'Expected');
  //t.throws(binomialCoefficient(args..), 'Expected');
  t.end();
});
