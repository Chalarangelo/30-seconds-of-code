const test = require('tape');
const btoa = require('./btoa.js');

test('Testing btoa', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof btoa === 'function', 'btoa is a Function');
  t.equals(btoa('foobar'), 'Zm9vYmFy', 'btoa("foobar") equals "Zm9vYmFy"');
  //t.deepEqual(btoa(args..), 'Expected');
  //t.equal(btoa(args..), 'Expected');
  //t.false(btoa(args..), 'Expected');
  //t.throws(btoa(args..), 'Expected');
  t.end();
});
