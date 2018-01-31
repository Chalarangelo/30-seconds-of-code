const test = require('tape');
const toCurrency = require('./toCurrency.js');

test('Testing toCurrency', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toCurrency === 'function', 'toCurrency is a Function');
  //t.deepEqual(toCurrency(args..), 'Expected');
  //t.equal(toCurrency(args..), 'Expected');
  //t.false(toCurrency(args..), 'Expected');
  //t.throws(toCurrency(args..), 'Expected');
  t.end();
});