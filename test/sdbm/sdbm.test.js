const test = require('tape');
const sdbm = require('./sdbm.js');

test('Testing sdbm', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sdbm === 'function', 'sdbm is a Function');
  t.equal(sdbm('name'), -3521204949, "Hashes the input string into a whole number.");
  //t.deepEqual(sdbm(args..), 'Expected');
  //t.equal(sdbm(args..), 'Expected');
  //t.false(sdbm(args..), 'Expected');
  //t.throws(sdbm(args..), 'Expected');
  t.end();
});