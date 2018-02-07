const test = require('tape');
const matchesWith = require('./matchesWith.js');

test('Testing matchesWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof matchesWith === 'function', 'matchesWith is a Function');
  const isGreeting = val => /^h(?:i|ello)$/.test(val);
  t.true(matchesWith(
    { greeting: 'hello' },
    { greeting: 'hi' },
    (oV, sV) => isGreeting(oV) && isGreeting(sV)
  ), 'Returns true for two objects with similar values, based on the provided function');
  //t.deepEqual(matchesWith(args..), 'Expected');
  //t.equal(matchesWith(args..), 'Expected');
  //t.false(matchesWith(args..), 'Expected');
  //t.throws(matchesWith(args..), 'Expected');
  t.end();
});
