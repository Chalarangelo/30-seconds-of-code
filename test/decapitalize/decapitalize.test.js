const test = require('tape');
const decapitalize = require('./decapitalize.js');

test('Testing decapitalize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof decapitalize === 'function', 'decapitalize is a Function');
  //t.deepEqual(decapitalize(args..), 'Expected');
  //t.equal(decapitalize(args..), 'Expected');
  //t.false(decapitalize(args..), 'Expected');
  //t.throws(decapitalize(args..), 'Expected');
  t.end();
});