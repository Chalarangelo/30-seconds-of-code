const test = require('tape');
const redirect = require('./redirect.js');

test('Testing redirect', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof redirect === 'function', 'redirect is a Function');
  //t.deepEqual(redirect(args..), 'Expected');
  //t.equal(redirect(args..), 'Expected');
  //t.false(redirect(args..), 'Expected');
  //t.throws(redirect(args..), 'Expected');
  t.end();
});